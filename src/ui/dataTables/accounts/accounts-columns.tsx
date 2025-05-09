import { ColumnDef } from '@tanstack/react-table';
import { AccountDto } from '@/api/response/account';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AccountInfoDialog } from '@/components/account/account-info-dialog';
import { AlignJustify } from 'lucide-react';
import { formatAccountNumber } from '@/lib/account-utils';

export const accountsColumns: ColumnDef<AccountDto>[] = [
  {
    accessorKey: 'accountNumber',
    header: 'Account Number',
    cell: (info) => formatAccountNumber(info.getValue() as string),
  },
  {
    accessorKey: 'client.firstName',
    header: 'First Name',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'client.lastName',
    header: 'Last Name',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'accountType',
    header: 'Account Type',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <AccountInfoDialog
          item={{
            accountNumber: row.original.accountNumber,
            balance: row.original.balance,
            currencyCode: row.original.currency.code,
            owner:
              row.original.client.firstName +
              ' ' +
              row.original.client.lastName,
            type: row.original.accountType,
            availableBalance: row.original.availableBalance,
            reservedBalance: 0 /* TODO: this is 0 for now. Should be changed in the later sprints */,
            monthlyLimit: row.original.monthlyLimit,
            dailyLimit: row.original.dailyLimit,
          }}
        />
        <Link href={`/e/cards?an=${row.original.accountNumber}`}>
          <Button variant="ghost">
            <AlignJustify />
          </Button>
        </Link>
      </div>
    ),
  },
];
