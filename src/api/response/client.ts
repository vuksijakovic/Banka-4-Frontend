import { Gender } from '@/types/gender';
import { Pageable } from '@/types/pageable';
import { Privilege } from '@/types/privileges';

export interface ClientResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  email: string;
  phone: string;
  address: string;
  privileges: Privilege[];
  // TODO(marko): add accounts field
}

export type ClientOverviewResponseDto = Pageable<ClientResponseDto>;
