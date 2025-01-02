export interface LoginResponse {
  token: string;
  email: string;
  roles: {
    $values: string[];
  };
}
