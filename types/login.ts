
export interface LoginSuccessResponse {
  token: string;
}

export interface LoginErrorResponse {
  error: string;
}
export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;