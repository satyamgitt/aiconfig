import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/authSlice';
import { validateCredentials, dummyAuth } from '../utils/auth';

export const useAuth = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      if (validateCredentials(email, password)) {
        const user = {
          uid: '1',
          email: dummyAuth.email,
          displayName: dummyAuth.fullName
        };
        dispatch(setUser(user));
        return true;
      } else {
        setError('Invalid email or password');
        return false;
      }
    } catch (err) {
      setError('An error occurred during sign in');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    setError(null);

    try {
      // For demo, always succeed with signup
      const user = {
        uid: '1',
        email,
        displayName: fullName
      };
      dispatch(setUser(user));
      return true;
    } catch (err) {
      setError('An error occurred during sign up');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    signIn,
    signUp,
    error,
    loading
  };
};