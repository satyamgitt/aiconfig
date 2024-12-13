// Dummy authentication utilities
export const dummyAuth = {
  email: 'demo@example.com',
  password: 'password123',
  fullName: 'Demo User'
};

export const validateCredentials = (email: string, password: string) => {
  return email === dummyAuth.email && password === dummyAuth.password;
};