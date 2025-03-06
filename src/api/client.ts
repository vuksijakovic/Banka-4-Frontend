import { Axios } from 'axios';
import {
  CreatePaymentRequest,
  EditClientRequest,
  NewClientRequest,
  SentCodeRequest,
} from '@/api/request/client';
import { PaymentResponseDto } from '@/api/response/client';
import { ClientResponseDto } from './response/client';
import { Pageable } from '@/types/pageable';

export const createPayment = async (
  client: Axios,
  data: CreatePaymentRequest
): Promise<PaymentResponseDto> => {
  const response = await client.post<PaymentResponseDto>(
    '/transaction/payment',
    data
  );
  return response.data;
};

export const getClientById = async (client: Axios, id: string) =>
  client.get<ClientResponseDto>(`/client/${id}`);

export const updateClientById = async (
  client: Axios,
  id: string,
  data: EditClientRequest
) => client.put<void>(`/client/${id}`, data);

export const postNewClient = async (client: Axios, data: NewClientRequest) =>
  client.post<void>('/client', data);

export const searchClients = async (
  client: Axios,
  filters: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  },
  rowsPerPage: number,
  currentPage: number
) => {
  return client.get<Pageable<ClientResponseDto>>('/client/search', {
    params: { ...filters, size: rowsPerPage, page: currentPage },
  });
};

export const sendCode = async (client: Axios, data: SentCodeRequest) =>
  client.post<void>('/verify/validate', data);
