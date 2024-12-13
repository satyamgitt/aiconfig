import React from 'react';
import { motion } from 'framer-motion';
import { Icons } from '../ui/icons';
import AuthModal from './AuthModal';

interface NavbarProps {
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  authMode: 'signin' | 'signup';
  setAuthMode: (mode: 'signin' | 'signup') => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isAuthOpen,
  setIsAuthOpen,
  authMode,
  setAuthMode
}) => {
  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gray-900/50 backdrop-blur-md"
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Icons.Power className="text-blue-400" size={32} />
              <span className="ml-2 text-2xl font-bold text-white">SmartSwitch</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => handleAuthClick('signin')}
                className="text-white hover:text-blue-400 transition-colors px-4 py-2"
              >
                Sign In
              </button>
              <button
                onClick={() => handleAuthClick('signup')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        mode={authMode}
        onSwitchMode={() => setAuthMode(mode => mode === 'signin' ? 'signup' : 'signin')}
      />
    </>
  );
};

export default Navbar;