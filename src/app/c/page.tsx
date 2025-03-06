'use client';

import { TransactionsResponseDto } from '@/api/response/transaction';
import { AccountDto } from '@/api/response/account';
import React, { useEffect, useState } from 'react';
import { AccountCarousel } from '@/components/account/account-carousel';
import { DataTable } from '@/components/dataTable/DataTable';
import { useQuery } from '@tanstack/react-query';
import { useHttpClient } from '@/context/HttpClientContext';
import { formatAccountNumber } from '@/lib/account-utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { transactionColumns } from '@/ui/dataTables/transactions/transactionColumns';
import GuardBlock from '@/components/GuardBlock';
import { useBreadcrumb } from '@/context/BreadcrumbContext';
import { searchTransactions } from '@/api/transaction';
import useTablePageParams from '@/hooks/useTablePageParams';
import { getClientAccounts } from '@/api/account';

const ClientHomePage: React.FC = () => {
  const { dispatch } = useBreadcrumb();
  useEffect(() => {
    dispatch({
      type: 'SET_BREADCRUMB',
      items: [{ title: 'Home' }],
    });
  }, [dispatch]);

  const [selectedAccount, setSelectedAccount] = useState<AccountDto | null>(
    null
  );
  const client = useHttpClient();
  const { page, pageSize, setPage, setPageSize } = useTablePageParams(
    'transactions',
    { pageSize: 8, page: 0 }
  );

  const { data: accounts } = useQuery<AccountDto[]>({
    queryKey: ['accounts'],
    queryFn: async () => {
      const response = await getClientAccounts(client);
      return response.data;
    },
  });

  const { data: transactions, isLoading } = useQuery<TransactionsResponseDto>({
    queryKey: ['transactions', page, pageSize, selectedAccount?.accountNumber],
    queryFn: async () => {
      return (
        await searchTransactions(
          client,
          { accountNumber: selectedAccount?.accountNumber },
          page,
          pageSize
        )
      ).data;
    },
    enabled: !!selectedAccount,
  });

  useEffect(() => {
    if (accounts && accounts.length > 0 && !selectedAccount) {
      setSelectedAccount(accounts[0]);
    }
  }, [accounts, selectedAccount]);

  return (
    <GuardBlock requiredUserType={'client'}>
      {accounts && (
        <AccountCarousel
          items={accounts.map((account) => ({
            accountNumber: account.accountNumber,
            balance: account.balance,
            currencyCode: account.currency.code,
            owner: account.client.firstName + ' ' + account.client.lastName,
            type: account.accountType,
            availableBalance: account.availableBalance,
            reservedBalance: 0 /* TODO(marko): this sprint, reservedBalance is always 0, fix this when the time comes */,
          }))}
          onSelect={(accountNumber: string) => {
            const account =
              accounts?.find((acc) => acc.accountNumber === accountNumber) ||
              null;
            setSelectedAccount(account);
          }}
        />
      )}
      {selectedAccount && (
        <div className={'flex flex-col items-center justify-center'}>
          <Card className="max-w-[900px] w-full mx-auto">
            <CardHeader>
              <h1 className="text-2xl font-bold">
                Transactions for Account:{' '}
                {formatAccountNumber(selectedAccount.accountNumber)}
              </h1>
              <CardDescription>
                This table provides a clear and organized overview of key
                transactions details for quick reference and easy access.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={transactionColumns}
                data={transactions?.content ?? []}
                isLoading={isLoading}
                pagination={{ page, pageSize }}
                onPaginationChange={(pagination) => {
                  setPage(pagination.page);
                  setPageSize(pagination.pageSize);
                }}
                pageCount={transactions?.page.totalPages ?? 0}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </GuardBlock>
  );
};

export default ClientHomePage;
