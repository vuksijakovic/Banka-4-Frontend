'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { Row } from '@tanstack/react-table';
import { useHttpClient } from '@/context/HttpClientContext';
import { useBreadcrumb } from '@/context/BreadcrumbContext';
import GuardBlock from '@/components/GuardBlock';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DataTable } from '@/components/dataTable/DataTable';
import useTablePageParams from '@/hooks/useTablePageParams';
import FilterBar, { FilterDefinition } from '@/components/filters/FilterBar';
import { approveLoan, rejectLoan, searchAllLoans } from '@/api/loans';
import { loansColumns } from '@/ui/dataTables/loans/loansOverviewColums';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ALL_LOAN_TYPES, LoanType } from '@/types/loan';
import { LoanDto } from '@/api/response/loan';

type LoanFilter = Partial<{
  loanType: LoanType;
  accountNumber: string;
}>;

const loanFilterColumns: Record<keyof LoanFilter, FilterDefinition> = {
  loanType: {
    filterType: 'enum',
    placeholder: 'Enter loan type',
    options: ALL_LOAN_TYPES,
    optionToString: (option) => option,
  },
  accountNumber: {
    filterType: 'string',
    placeholder: 'Enter account number',
  },
};

const LoansRequestsPage: React.FC = () => {
  const { page, pageSize, setPage, setPageSize } = useTablePageParams(
    'loan-requests',
    {
      pageSize: 8,
      page: 0,
    }
  );

  const [searchFilter, setSearchFilter] = useState<LoanFilter>({
    loanType: undefined,
    accountNumber: '',
  });

  const client = useHttpClient();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['loan-requests', page, pageSize, searchFilter],
    queryFn: async () =>
      (
        await searchAllLoans(
          client,
          { ...searchFilter, loanStatus: 'PROCESSING' },
          page,
          pageSize
        )
      ).data,
  });

  const approveMutation = useMutation({
    mutationFn: (loanNumber: number) => approveLoan(client, loanNumber),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loan-requests'] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (loanNumber: number) => rejectLoan(client, loanNumber),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loan-requests'] });
    },
  });

  const { dispatch } = useBreadcrumb();
  useEffect(() => {
    dispatch({
      type: 'SET_BREADCRUMB',
      items: [
        { title: 'Home', url: '/e' },
        { title: 'Loans', url: '/e/loans' },
        { title: 'Requests' },
      ],
    });
  }, [dispatch]);

  const columnsWithActions = [
    ...loansColumns,
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: { row: Row<LoanDto> }) => (
        <div className="flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Approve</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Approval</AlertDialogTitle>
              </AlertDialogHeader>
              <p>Are you sure you want to approve this loan?</p>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    approveMutation.mutate(row.original.loanNumber)
                  }
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Deny</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Denial</AlertDialogTitle>
              </AlertDialogHeader>
              <p>Are you sure you want to deny this loan?</p>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => rejectMutation.mutate(row.original.loanNumber)}
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];

  return (
    <GuardBlock requiredUserType="employee">
      <div className="p-8">
        <Card className="max-w-[900px] mx-auto">
          <CardHeader>
            <h1 className="text-2xl font-bold">Loan Requests</h1>
            <CardDescription>
              Review and manage loan requests that are currently in processing
              status.
            </CardDescription>
            <FilterBar<LoanFilter, typeof loanFilterColumns>
              onSubmit={(filter) => {
                setPage(0);
                setSearchFilter(filter);
              }}
              filter={searchFilter}
              columns={loanFilterColumns}
            />
          </CardHeader>
          <CardContent className="rounded-lg overflow-hidden">
            <DataTable
              columns={columnsWithActions}
              data={data?.content ?? []}
              isLoading={isLoading}
              pageCount={data?.page.totalPages ?? 0}
              pagination={{ page, pageSize }}
              onPaginationChange={(newPagination) => {
                setPage(newPagination.page);
                setPageSize(newPagination.pageSize);
              }}
            />
          </CardContent>
        </Card>
      </div>
    </GuardBlock>
  );
};

export default LoansRequestsPage;
