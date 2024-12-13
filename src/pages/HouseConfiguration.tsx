import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import HouseTypeSelector from '../components/HouseTypeSelector';
import RoomConfiguration from '../components/RoomConfiguration';
import SaveConfig from '../components/SaveConfig';

const HouseConfiguration = () => {
  const selectedType = useSelector((state: RootState) => state.house.selectedType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {!selectedType ? (
        <HouseTypeSelector onSelect={() => {}} />
      ) : (
        <>
          <RoomConfiguration 
            houseType={selectedType} 
            onBack={() => {}}
          />
          <SaveConfig />
        </>
      )}
    </div>
  );
};

export default HouseConfiguration;