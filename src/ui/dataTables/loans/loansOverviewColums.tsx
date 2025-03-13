import { ColumnDef } from '@tanstack/react-table';
import { LoanDto } from '@/api/response/loan';
import { LoanRequestDto } from '@/api/response/loan';

export const loanRequestColumns: ColumnDef<LoanRequestDto>[] = [
  {
    accessorKey: 'loanType',
    header: 'Loan Type',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'currency.code',
    header: 'Currency Code',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'purposeOfLoan',
    header: 'Purpose',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'monthlyIncome',
    header: 'Monthly Income',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'employmentStatus',
    header: 'Employment Status',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'employmentPeriod',
    header: 'Employment Period (Years)',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'repaymentPeriod',
    header: 'Repayment Period (Months)',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'loanNumber',
    header: 'Loan Number',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'contactPhone',
    header: 'Contact Phone',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'accountNumber',
    header: 'Account Number',
    cell: (info) => info.getValue(),
  },
];

export const loansColumns: ColumnDef<LoanDto>[] = [
  {
    accessorKey: 'type',
    header: 'Type',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'interestType',
    header: 'Interest Type',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'agreementDate',
    header: 'Agreement Date',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'repaymentPeriod',
    header: 'Repayment Period',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'loanNumber',
    header: 'Loan Number',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'remainingDebt',
    header: 'Remaining Debt',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'currency.code',
    header: 'Currency Code',
    cell: (info) => info.getValue(),
  },

  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => info.getValue(),
  },
];
