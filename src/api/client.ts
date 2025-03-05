import { Axios } from 'axios';
import { CreatePaymentRequest, SentCodeRequest } from '@/api/request/client';
import { PaymentResponseDto } from '@/api/response/client';

export const createPayment = async (
  client: Axios,
  data: CreatePaymentRequest
): Promise<PaymentResponseDto> => {
  const response = await client.post<PaymentResponseDto>('/payment', data);
  return response.data;
};

export const sendCode = async (client: Axios, data: SentCodeRequest) =>
  client.post<void>('/verify/validate', data);
