import React from 'react';
import { useDispatch } from 'react-redux';
import { updateSwitchFeatures } from '../store/houseSlice';

interface SwitchFeaturesProps {
  roomId: string;
  switchboardId: string;
  switchId: string;
  features: {
    dimming: boolean;
    timer: boolean;
    remote: boolean;
  };
}

const SwitchFeatures: React.FC<SwitchFeaturesProps> = ({
  roomId,
  switchboardId,
  switchId,
  features,
}) => {
  const dispatch = useDispatch();

  const handleFeatureChange = (feature: 'dimming' | 'timer' | 'remote') => {
    dispatch(updateSwitchFeatures({
      roomId,
      switchboardId,
      switchId,
      features: { [feature]: !features[feature] },
    }));
  };

  return (
    <div className="flex gap-4 mt-2">
      {(['dimming', 'timer', 'remote'] as const).map((feature) => (
        <label key={feature} className="flex items-center gap-2">
          <input
            type="radio"
            checked={features[feature]}
            onChange={() => handleFeatureChange(feature)}
            className="form-radio text-blue-600"
          />
          <span className="text-sm text-gray-300 capitalize">{feature}</span>
        </label>
      ))}
    </div>
  );
};

export default SwitchFeatures;