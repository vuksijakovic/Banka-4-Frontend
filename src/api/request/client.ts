import { Gender } from '@/types/gender';
import { Privilege } from '@/types/privileges';

export interface CreatePaymentRequest {
  fromAccount: string;
  toAccount: string;
  fromAmount: number;
  recipient: string;
  paymentCode: string;
  referenceNumber: string;
  paymentPurpose: string;
}

export interface SentCodeRequest {
  content: string;
  paymentId: string;
}

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
