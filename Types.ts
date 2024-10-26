// types/auth.ts
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  custom_pharmacy_id: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  refreshToken?: string | null;
  user: User | null;
  error: string | null;
}

export interface LoginCredentials {
  custom_pharmacy_id: string;
  password: string;
}
