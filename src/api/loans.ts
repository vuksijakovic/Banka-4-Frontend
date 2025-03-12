import { Axios } from 'axios';
import { LoansResponseDto } from './response/loans';

export interface LoanFilters {
  loanType?: string;
  loanStatus?: string;
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
  filters: {
    loanType?: string;
    accountNumber?: string;
    loanStatus?: string;
  },
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
