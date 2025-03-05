import { Pageable } from '@/types/pageable';
import { ClientPrivilege } from '@/types/privileges';

export interface ClientResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  privileges: ClientPrivilege[];
  // TODO(marko): add accounts field
}
export type ClientOverviewResponseDto = Pageable<ClientResponseDto>;
