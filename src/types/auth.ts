export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  fullName: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    fullName: string;
    token: string;
  };
}

export interface AuthState {
  user: AuthResponse['user'] | null;
  loading: boolean;
  error: string | null;
}