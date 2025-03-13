import { Pageable } from '@/types/pageable';
import { CurrencyDto } from './account';
import { InterestType, LoanStatus, LoanType } from '@/types/loan';

export interface LoanDto {
  loanNumber: number;
  type: LoanType;
  amount: number;
  repaymentPeriod: number;
  interestRate: number;
  effectiveInterestRate: number;
  agreementDate: string;
  dueDate: string;
  nextInstallmentAmount: number;
  nextInstallmentDate: string;
  remainingDebt: number;
  currency: CurrencyDto;
  status: LoanStatus;
  interestType: InterestType;
}

export type LoansResponseDto = Pageable<LoanDto>;
