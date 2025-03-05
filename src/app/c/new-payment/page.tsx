'use client';
import * as React from 'react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useHttpClient } from '@/context/HttpClientContext';
import NewTransactionForm, {
  NewTransactionFormValues,
} from '@/components/client/new-transaction-form';
import { Card } from '@/components/ui/card';
import { Dialog2FA } from '@/components/Dialog2FA';
import { getAccounts } from '@/api/account';
import { createPayment, sendCode } from '@/api/client';
import { RecipientDto } from '@/api/response/recipient';
import { Toaster, toast } from 'sonner';
import { PaymentResponseDto } from '@/api/response/client';

export default function NewPaymentPage() {
  const [recipients] = useState<RecipientDto[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [paymentData, setPaymentData] =
    useState<NewTransactionFormValues | null>(null);

  const client = useHttpClient();

  const { data: accounts } = useQuery({
    queryKey: ['accounts'],
    queryFn: async () => (await getAccounts(client)).data,
  });

  const handleCreatePayment = async (data: NewTransactionFormValues) => {
    setPaymentData(data);
    setIsDialogOpen(true);
  };

  const handleDialogSubmit = async (otp: string) => {
    if (!paymentData) return;

    try {
      setIsPending(true);

      const paymentRequest = {
        fromAccount: paymentData.payerAccount,
        toAccount: paymentData.recipientAccount,
        recipient: paymentData.recipientName,
        amount: paymentData.amount,
        paymentCode: paymentData.paymentCode,
        paymentPurpose: paymentData.paymentPurpose,
        referenceNumber: paymentData.referenceNumber ?? '',
      };

      const response: PaymentResponseDto = await createPayment(
        client,
        paymentRequest
      );
      const paymentId = response.id;
      await sendCode(client, { content: otp, paymentId });
      console.log('Payment successful', response);
      setIsDialogOpen(false);
      toast.success('Payment successful');
    } catch (error) {
      console.error('Payment failed', error);
      toast.error('Payment failed');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[430px] p-4">
        <NewTransactionForm
          onSubmitAction={handleCreatePayment}
          accounts={accounts || []}
          recipients={recipients}
          isPending={isPending}
        />
        <Dialog2FA
          open={isDialogOpen}
          onSubmit={handleDialogSubmit}
          onCancel={() => setIsDialogOpen(false)}
        />
      </Card>
      <Toaster />
    </div>
  );
}
