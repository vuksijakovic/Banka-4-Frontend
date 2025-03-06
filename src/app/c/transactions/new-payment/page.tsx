'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useHttpClient } from '@/context/HttpClientContext';
import NewTransactionForm, {
  NewTransactionFormValues,
} from '@/components/client/new-transaction-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { Dialog2FA } from '@/components/Dialog2FA';
import { getAccounts } from '@/api/account';
import { createPayment, sendCode } from '@/api/client';
import { RecipientDto } from '@/api/response/recipient';
import { toast } from 'sonner';
import { PaymentResponseDto } from '@/api/response/client';
import GuardBlock from '@/components/GuardBlock';
import { useBreadcrumb } from '@/context/BreadcrumbContext';

export default function NewPaymentPage() {
  const { dispatch } = useBreadcrumb();
  useEffect(() => {
    dispatch({
      type: 'SET_BREADCRUMB',
      items: [
        { title: 'Home', url: '/c' },
        { title: 'Transactions', url: '/c/transactions' },
        { title: 'New Payment' },
      ],
    });
  }, [dispatch]);
  const [recipients] = useState<RecipientDto[]>(
    []
  ); /* TODO(marko): implement get recipients endpoint (when backend implements it...) */
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

  /* TODO(marko): fix this once backend implements 2FA; no point in doing it now since the whole logic will change then */
  const handleDialogSubmit = async (otp: string) => {
    if (!paymentData) return;

    try {
      setIsPending(true);

      const paymentRequest = {
        fromAccount: paymentData.payerAccount,
        toAccount: paymentData.recipientAccount,
        recipient: paymentData.recipientName,
        fromAmount: paymentData.amount,
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
    <GuardBlock requiredUserType={'client'}>
      <div className={'pt-8 flex justify-center'}>
        <Card className="w-[800px]">
          <CardHeader>
            <h1 className="text-2xl font-bold">Make a new payment</h1>
            <CardDescription>
              Quickly send money to another account with just a few taps. Fast,
              secure, and hassle-free.
            </CardDescription>
          </CardHeader>
          <hr className={'mx-6'} />
          <CardContent className={'pt-6'}>
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
          </CardContent>
        </Card>
      </div>
    </GuardBlock>
  );
}
