import { Privilege } from '@/types/privileges';

export interface NewClientRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  address: string;
  gender: string;
  privilege: Privilege[];
}

export type EditClientRequest = Partial<NewClientRequest>;
