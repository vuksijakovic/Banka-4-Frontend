import { Pageable } from '@/types/pageable';

export interface EmployeeResponseDto {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  username: string;
  position: string;
  department: string;
  active: boolean;
}

export type EmployeeOverviewResponseDto = Pageable<EmployeeResponseDto>;
