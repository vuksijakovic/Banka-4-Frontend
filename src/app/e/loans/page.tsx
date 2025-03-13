'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { useHttpClient } from '@/context/HttpClientContext';
import { useBreadcrumb } from '@/context/BreadcrumbContext';
import GuardBlock from '@/components/GuardBlock';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/dataTable/DataTable';
import useTablePageParams from '@/hooks/useTablePageParams';
import FilterBar, { FilterDefinition } from '@/components/filters/FilterBar';
import { LoanFilters, searchAllLoans } from '@/api/loans';
import { loansColumns } from '@/ui/dataTables/loans/loansOverviewColums';
import { ALL_LOAN_STATUSES, ALL_LOAN_TYPES } from '@/types/loan';

const loanFilterColumns: Record<keyof LoanFilters, FilterDefinition> = {
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
  loanStatus: {
    filterType: 'enum',
    placeholder: 'Enter status',
    options: ALL_LOAN_STATUSES,
    optionToString: (option) => option,
  },
};

const LoansOverviewPage: React.FC = () => {
  const { page, pageSize, setPage, setPageSize } = useTablePageParams('loans', {
    pageSize: 8,
    page: 0,
  });

  const [searchFilter, setSearchFilter] = useState<LoanFilters>({
    loanType: undefined,
    accountNumber: '',
    loanStatus: undefined,
  });

  const client = useHttpClient();

  const { data, isLoading } = useQuery({
    queryKey: ['loans', page, pageSize, searchFilter],
    queryFn: async () =>
      (await searchAllLoans(client, searchFilter, page, pageSize)).data,
  });

  const { dispatch } = useBreadcrumb();
  useEffect(() => {
    dispatch({
      type: 'SET_BREADCRUMB',
      items: [
        { title: 'Home', url: '/e' },
        { title: 'Loans', url: '/e/loans' },
        { title: 'Overview' },
      ],
    });
  }, [dispatch]);

  return (
    <GuardBlock requiredUserType="employee">
      <div className="p-8">
        <Card className="max-w-[900px] mx-auto">
          <CardHeader>
            <h1 className="text-2xl font-bold">Loans Overview</h1>
            <CardDescription>
              This table provides a clear and well-structured overview of loans,
              making it easy to review key details and track relevant
              information.
            </CardDescription>
            <FilterBar<LoanFilters, typeof loanFilterColumns>
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
              columns={loansColumns}
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

export default LoansOverviewPage;
