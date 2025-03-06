import { Pageable } from '@/types/pageable';

export const paymentStatusToString = (status: TransactionStatus): string => {
  switch (status) {
    case TransactionStatus.REALIZED:
      return 'Realized';
    case TransactionStatus.REJECTED:
      return 'Rejected';
    case TransactionStatus.IN_PROGRESS:
      return 'In Progress';
  }
};

export interface TransactionDto {
  id: string;
  transactionNumber: string;
  fromAccount: string;
  toAccount: string;
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
  feeAmount: number;
  feeCurrency: string;
  recipient: string;
  paymentCode: string;
  referenceNumber: string;
  paymentPurpose?: string;
  paymentDateTime: string;
  status: TransactionStatus;
}

export enum TransactionStatus {
  REALIZED = 'REALIZED',
  REJECTED = 'REJECTED',
  IN_PROGRESS = 'IN_PROGRESS',
}

export type TransactionsResponseDto = Pageable<TransactionDto>;
