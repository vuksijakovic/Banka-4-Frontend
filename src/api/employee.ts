import { Axios } from 'axios';
import { MeResponseDto } from './response/MeResponseDto';
import { NewEmployeeRequest } from '@/api/request/employee';
import { VerifyPasswordRequest } from '@/api/request/auth';

export const getMe = async (client: Axios) =>
  client.get<MeResponseDto>('/employee/me');

export const postNewEmployee = async (
  client: Axios,
  data: NewEmployeeRequest
) => client.post<void>('/employee', data);

export const verifyPassword = async (
  client: Axios,
  data: VerifyPasswordRequest
) => client.post<void>('/auth/verify', data);

export const forgotPassword = async (client: Axios, email: string) =>
  client.get<void>(`/auth/forgot-password/${email}`);
