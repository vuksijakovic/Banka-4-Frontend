import { ColumnDef } from '@tanstack/react-table';
import { LoanDto } from '@/api/response/loan';

export const loanColumns: ColumnDef<LoanDto>[] = [
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'loanNumber',
    header: 'Loan Number',
  },
  {
    accessorKey: 'amount',
    header: 'Total loan amount',
    cell: (info) => {
      const amount = info.getValue<number>();
      const currencyCode = info.row.original.currency.code;
      return `${amount.toLocaleString()} ${currencyCode}`;
    },
  },
];
