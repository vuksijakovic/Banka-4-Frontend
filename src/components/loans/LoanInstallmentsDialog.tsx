import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useQuery } from '@tanstack/react-query';
import { useHttpClient } from '@/context/HttpClientContext';
import { getLoanInstallments } from '@/api/loans';
import { useState, useEffect } from 'react';
import { DataTable } from '@/components/dataTable/DataTable';
import { loanInstallmentColumns } from '@/ui/dataTables/loans/loanInstallmentColumns';
import { Button } from '@/components/ui/button';

export const LoanInstallmentsDialog = ({
  loanNumber,
  open,
  setOpen,
}: {
  loanNumber: number | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const client = useHttpClient();
  const [page, setPage] = useState(0);
  const size = 8;

  useEffect(() => {
    if (loanNumber !== null) setPage(0);
  }, [loanNumber]);

  const { data, isLoading } = useQuery({
    queryKey: ['loanInstallments', loanNumber, page],
    queryFn: async () => {
      if (loanNumber === null) return { content: [], page: { totalPages: 0 } };
      return (await getLoanInstallments(client, loanNumber, page, size)).data;
    },
    enabled: loanNumber !== null && open,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl h-[70vh]">
        <DialogHeader>
          <DialogTitle>Loan Installments</DialogTitle>
          <DialogDescription>
            Installments of this loan are shown in the following form.
          </DialogDescription>
        </DialogHeader>

        <DataTable
          columns={loanInstallmentColumns}
          data={data?.content ?? []}
          isLoading={isLoading}
          pagination={{ page, pageSize: size }}
          onPaginationChange={(pagination) => setPage(pagination.page)}
          pageCount={data?.page?.totalPages ?? 0}
        />

        <Button onClick={() => setOpen(false)} className="mt-4">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};
