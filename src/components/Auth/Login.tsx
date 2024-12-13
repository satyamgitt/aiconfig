import React from 'react';
import { useDispatch } from 'react-redux';
import { Home } from 'lucide-react';
import { setUser } from '../../store/authSlice';

const Login = () => {
  const dispatch = useDispatch();

  // Auto-login for development
  React.useEffect(() => {
    const tempUser = {
      uid: 'temp-user-123',
      email: 'temp@example.com',
      displayName: 'Temporary User'
    };
    dispatch(setUser(tempUser));
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <div className="flex items-center justify-center mb-6">
          <Home className="text-blue-600 w-10 h-10" />
          <h2 className="text-2xl font-bold ml-2">Smart Home</h2>
        </div>
        <div className="text-center text-gray-600">
          Automatically logging in...
        </div>
      </div>
    </div>
  );
};

export default Login;