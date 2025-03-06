import { ClientResponseDto } from './client';
import { CompanyResponseDto } from './company';
import { EmployeeResponseDto } from './employee';
import { Pageable } from '@/types/pageable';

export interface AccountDto {
  id: string;
  accountNumber: string;
  balance: number;
  availableBalance: number;
  accountMaintenance: number;
  createdDate: Date;
  expirationDate: Date;
  active: boolean;
  accountType: string;
  monthlyLimit: number;
  dailyLimit: number;
  currency: CurrencyDto;
  client: ClientResponseDto;
  employee: EmployeeResponseDto;
  company: CompanyResponseDto;
}

export interface CurrencyDto {
  id: string;
  name: string;
  code: string;
  symbol: string;
}

export type AccountOverviewResponseDto = Pageable<AccountDto>;
