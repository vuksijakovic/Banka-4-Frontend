"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";

interface User {
  id: string;
  first_name: string;
  last_name: string;
}

interface AuthContextType {
  user: User | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const [accessToken, setAccessToken] = useState<string | null>(
    () => sessionStorage.getItem("access_token")
  );

  const { data, isLoading, isError, refetch } = useQuery<User | null>({
    queryKey: ["auth", "user"],
    queryFn: () => fetcher("/auth/me"),
    enabled: !!accessToken, 
    retry: false,
  });
  
  const user = data || null;

  const login = (accessToken: string, refreshToken: string) => {
    sessionStorage.setItem("access_token", accessToken);
    sessionStorage.setItem("refresh_token", refreshToken);
    setAccessToken(accessToken);

    refetch();  
  };

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const refreshToken = sessionStorage.getItem("refresh_token");
      return fetcher("/auth/logout", {
        method: "POST",
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
    },
    onSuccess: () => {
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("refresh_token");
      setAccessToken(null);
      queryClient.setQueryData(["auth", "user"], null);
    },
  });

  const logout = () => logoutMutation.mutate();

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
