export interface LoginResponse {
  message: string;
  token: string;
  roles:  Array<string>;
  email: string;
}
