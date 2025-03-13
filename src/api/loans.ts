import { Axios } from 'axios';
import { LoanStatus, LoanType } from '@/types/loan';
import { LoansResponseDto } from '@/api/response/loan';

export interface LoanFilters {
  loanType?: LoanType;
  loanStatus?: LoanStatus;
  accountNumber?: string;
}

export const searchLoans = async (
  client: Axios,
  page: number,
  size: number
) => {
  return client.get<LoansResponseDto>('/loans/me', {
    params: { page, size },
  });
};

export const searchAllLoans = async (
  client: Axios,
  filters: LoanFilters,
  page: number,
  size: number
) => {
  const cleanedFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== '')
  );

  return client.get<LoansResponseDto>('/loans/search', {
    params: { ...cleanedFilters, page, size },
  });
};

export const approveLoan = async (client: Axios, loanNumber: number) => {
  return client.put<void>(`/loans/approve/${loanNumber}`);
};

export const rejectLoan = async (client: Axios, loanNumber: number) => {
  return client.put<void>(`/loans/reject/${loanNumber}`);
};
