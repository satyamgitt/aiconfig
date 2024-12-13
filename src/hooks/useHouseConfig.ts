import { useState } from 'react';

export const useHouseConfig = () => {
  const [selectedHouseType, setSelectedHouseType] = useState<string | null>(null);
  const [currentRoom, setCurrentRoom] = useState('hall');

  return {
    selectedHouseType,
    setSelectedHouseType,
    currentRoom,
    setCurrentRoom,
  };
};