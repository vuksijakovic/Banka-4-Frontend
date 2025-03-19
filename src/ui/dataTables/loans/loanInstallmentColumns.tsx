import { ColumnDef } from '@tanstack/react-table';
import { LoanInstallmentDto } from '@/api/response/loan';

export const loanInstallmentColumns: ColumnDef<LoanInstallmentDto>[] = [
  {
    accessorKey: 'installmentAmount',
    header: 'Installment Amount',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'interestRateAmount',
    header: 'Interest Rate Amount',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'expectedDueDate',
    header: 'Expected Due Date',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'actualDueDate',
    header: 'Actual Due Date',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Payment Status',
    cell: (info) => info.getValue(),
  },
];
