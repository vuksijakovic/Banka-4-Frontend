/** `POST /auth/refresh-token` response body.  */
export interface RefreshTokenResponseDto {
  access_token: string;
}

/** `POST /auth/login` response body.  */
export interface LoginResponseDto {
  access_token: string;
  refresh_token: string;
}

export interface EmployeeResponseDto{
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    position: string,
    active: boolean,
}
