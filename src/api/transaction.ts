import { Axios } from 'axios';
import {
  TransactionsResponseDto,
  TransactionStatus,
} from './response/transaction';

export interface TransactionFilters {
  date?: Date;
  status?: TransactionStatus;
  amount?: number;
  accountNumber?: string;
}

export const searchTransactions = async (
  client: Axios,
  filters: TransactionFilters,
  page: number,
  size: number
) =>
  client.get<TransactionsResponseDto>(`/transaction/search`, {
    params: { ...filters, page, size },
  });
