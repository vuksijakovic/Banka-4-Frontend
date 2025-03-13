export const ALL_LOAN_STATUSES_ = [
  'APPROVED',
  'REJECTED',
  'PAID_OFF',
  'DELAYED',
  'PROCESSING',
] as const;

export type LoanStatus = (typeof ALL_LOAN_STATUSES_)[number];
export const ALL_LOAN_STATUSES: LoanStatus[] = [...ALL_LOAN_STATUSES_];

export const ALL_INTEREST_TYPES_ = ['FIXED', 'VARIABLE'] as const;

export type InterestType = (typeof ALL_INTEREST_TYPES_)[number];
export const ALL_INTEREST_TYPES: InterestType[] = [...ALL_INTEREST_TYPES_];

export const ALL_LOAN_TYPES_ = [
  'CASH',
  'MORTGAGE',
  'AUTO_LOAN',
  'REFINANCING',
  'STUDENT_LOAN',
] as const;

export type LoanType = (typeof ALL_LOAN_TYPES_)[number];
export const ALL_LOAN_TYPES: LoanType[] = [...ALL_LOAN_TYPES_];
