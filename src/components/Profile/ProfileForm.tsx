import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Icons } from '../ui/icons';
import { UserProfile } from '../../types/profile';
import { profileApi } from '../../api/profile';
import { setProfile, setError, setLoading } from '../../store/profileSlice';
import { RootState } from '../../store/store';

const ProfileForm: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { loading, error } = useSelector((state: RootState) => state.profile);

  const [formData, setFormData] = useState({
    location: '',
    towerName: '',
    flatNumber: '',
    floor: ''
  });

  const [formErrors, setFormErrors] = useState({
    location: '',
    towerName: '',
    flatNumber: '',
    floor: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {
      location: '',
      towerName: '',
      flatNumber: '',
      floor: ''
    };
    let isValid = true;

    if (!formData.location.trim()) {
      errors.location = 'Location is required';
      isValid = false;
    }
    if (!formData.towerName.trim()) {
      errors.towerName = 'Tower name is required';
      isValid = false;
    }
    if (!formData.flatNumber.trim()) {
      errors.flatNumber = 'Flat number is required';
      isValid = false;
    }
    if (!formData.floor.trim()) {
      errors.floor = 'Floor is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      dispatch(setLoading(true));
      const profileData: UserProfile = {
        userId: user?.id || '',
        ...formData,
        isProfileComplete: true
      };
      
      const updatedProfile = await profileApi.updateProfile(profileData);
      dispatch(setProfile(updatedProfile));
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to update profile'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8"
      >
        <div className="flex items-center gap-3 mb-8">
          <Icons.User className="text-blue-400" size={28} />
          <h1 className="text-2xl font-bold text-white">Complete Your Profile</h1>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your location"
            />
            {formErrors.location && (
              <p className="mt-1 text-sm text-red-400">{formErrors.location}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tower Name
            </label>
            <input
              type="text"
              name="towerName"
              value={formData.towerName}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter tower name"
            />
            {formErrors.towerName && (
              <p className="mt-1 text-sm text-red-400">{formErrors.towerName}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Flat Number
              </label>
              <input
                type="text"
                name="flatNumber"
                value={formData.flatNumber}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter flat number"
              />
              {formErrors.flatNumber && (
                <p className="mt-1 text-sm text-red-400">{formErrors.flatNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Floor
              </label>
              <input
                type="text"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter floor"
              />
              {formErrors.floor && (
                <p className="mt-1 text-sm text-red-400">{formErrors.floor}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Icons.ChevronRight size={20} />
                Continue to Home Configuration
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfileForm;