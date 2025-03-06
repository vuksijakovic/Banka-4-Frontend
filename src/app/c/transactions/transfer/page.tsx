'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import TransferForm from '@/components/transfer/transfer-form';
import { postNewTransfer } from '@/api/transfer';
import { AccountDto } from '@/api/response/account';
import { useHttpClient } from '@/context/HttpClientContext';
import { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { getClientAccounts } from '@/api/account';
import { toastRequestError } from '@/api/errors';
import GuardBlock from '@/components/GuardBlock';
import { useBreadcrumb } from '@/context/BreadcrumbContext';

interface TransferData {
  fromAccount: string;
  toAccount: string;
  fromAmount: number;
}

export default function TransferPage() {
  const { dispatch } = useBreadcrumb();
  useEffect(() => {
    dispatch({
      type: 'SET_BREADCRUMB',
      items: [
        { title: 'Home', url: '/c' },
        { title: 'Transactions', url: '/c/transactions' },
        { title: 'New Transfer' },
      ],
    });
  }, [dispatch]);
  const client = useHttpClient();

  const {
    data: accounts = [],
    isLoading,
    error,
  } = useQuery<AccountDto[]>({
    queryKey: ['accounts'],
    queryFn: async () => (await getClientAccounts(client)).data,
  });

  const [isTransferSuccessful, setIsTransferSuccessful] = useState(false);

  const mutation = useMutation({
    mutationFn: (transferData: TransferData) =>
      postNewTransfer(client, transferData),
    onSuccess: () => {
      setIsTransferSuccessful(true);
    },
    onError: (error) => {
      toastRequestError(error);
    },
  });

  const handleTransferSubmit = (transferData: TransferData) => {
    mutation.mutate(transferData);
  };

  return (
    <GuardBlock requiredUserType={'client'}>
      <div className="flex justify-center items-center pt-12">
        <Card>
          <CardHeader>
            <CardTitle>Transfer Funds</CardTitle>
            <CardDescription>
              Fill in the details below to transfer funds between accounts.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <TransferForm accounts={accounts} onSubmit={handleTransferSubmit} />
          </CardContent>

          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Transaction details are required to process the transfer.
            </p>
          </CardFooter>
        </Card>
      </div>
    </GuardBlock>
  );
}
