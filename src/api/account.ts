import { Axios } from 'axios';
import { AccountDto } from '@/api/response/account';

export const getAccounts = async (client: Axios) => {
  return client.get<AccountDto[]>(`/account/`);
};
