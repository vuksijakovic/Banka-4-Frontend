import { Axios } from 'axios';
import {
  ClientOverviewResponseDto,
  ClientResponseDto,
} from './response/client';
import { EditClientRequest, NewClientRequest } from './request/client';

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
  },
  rowsPerPage: number,
  currentPage: number
) => {
  return client.get<ClientOverviewResponseDto>('/client/search', {
    params: { ...filters, size: rowsPerPage, page: currentPage },
  });
};
