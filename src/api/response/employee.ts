import { Gender } from '@/types/gender';
import { Pageable } from '@/types/pageable';
import { EmployeePrivilege } from '@/types/privileges';

export interface EmployeeResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  email: string;
  phone: string;
  address: string;
  username: string;
  position: string;
  department: string;
  active: boolean;
  privileges: EmployeePrivilege[];
}

export type EmployeeOverviewResponseDto = Pageable<EmployeeResponseDto>;
