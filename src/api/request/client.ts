import { Gender } from '@/types/gender';
import { Privilege } from '@/types/privileges';

export interface NewClientRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  address: string;
  gender: Gender;
  privilege: Privilege[];
}

export type EditClientRequest = Partial<NewClientRequest>;
