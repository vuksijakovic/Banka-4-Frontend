import { ColumnDef, Row } from '@tanstack/react-table';
import { LoanDto } from '@/api/response/loan';
import { Button } from '@/components/ui/button';

export const loanColumns = (
  handleViewDetails: (loan: LoanDto) => void,
  handleViewInstallments: (loanNumber: number) => void
) => [
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
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }: { row: Row<LoanDto> }) => (
      <div className="flex gap-2 justify-center items-center">
        <Button size="sm" onClick={() => handleViewDetails(row.original)}>
          Details
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleViewInstallments(row.original.loanNumber)}
        >
          Installments
        </Button>
      </div>
    ),
  },
];
