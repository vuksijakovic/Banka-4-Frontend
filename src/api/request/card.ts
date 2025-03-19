import { Gender } from '@/types/gender';

export interface CreateCardRequest {
  accountNumber: string;
  authorizedUser: CreateAuthorizedUserRequest | null;
  otpCode: string;
}

export interface CreateAuthorizedUserRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  email: string;
  phoneNumber: string;
  address: string;
}
