import { Axios } from 'axios';
import { MeResponseDto } from './response/MeResponseDto';
import { NewEmployeeRequest } from '@/api/request/employee';

export const getMe = async (client: Axios) =>
  client.get<MeResponseDto>('/employee/me');

export const postNewEmployee = async (
  client: Axios,
  data: NewEmployeeRequest
) => client.post<void>('/employee', data);

export const searchEmployees = async (
  client: Axios,
  filters: {
    firstName: string;
    lastName: string;
    email: string;
    position: string;
  },
  rowsPerPage: number,
  currentPage: number,
) => {
  let url = `/employee/search?size=${rowsPerPage}&page=${currentPage-1}`;
  if (filters.firstName) url += `&firstName=${filters.firstName}`;
  if (filters.lastName) url += `&lastName=${filters.lastName}`;
  if (filters.email) url += `&email=${filters.email}`;
  if (filters.position) url += `&position=${filters.position}`;
  return client.get(url);
};