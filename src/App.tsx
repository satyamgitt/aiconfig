import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import Landing from './pages/Landing';
import ProfileForm from './components/Profile/ProfileForm';
import HouseConfiguration from './pages/HouseConfiguration';

function App() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: profile } = useSelector((state: RootState) => state.profile);

  if (!user) {
    return <Landing />;
  }

  if (!profile?.isProfileComplete) {
    return <ProfileForm />;
  }

  return <HouseConfiguration />;
}

export default App;