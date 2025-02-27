import { useQuery } from '@tanstack/react-query';
import { forgotPassword, getMe } from '@/api/employee';
import { Axios } from 'axios';

export function useMe(client: Axios) {
  return useQuery({
    queryFn: async () => (await getMe(client)).data,
    queryKey: ['employee', 'me'],
  });
}

export function useForgotPassword(client: Axios, email: string) {}
