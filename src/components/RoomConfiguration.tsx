import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Plus, ChevronLeft } from 'lucide-react';
import { RootState } from '../store/store';
import SwitchboardConfig from './SwitchboardConfig';
import { setCurrentRoom, addRoom } from '../store/houseSlice';
import { Room, HouseType } from '../store/types';

interface RoomConfigurationProps {
  houseType: HouseType;
  onBack: () => void;
}

const RoomConfiguration: React.FC<RoomConfigurationProps> = ({ houseType, onBack }) => {
  const dispatch = useDispatch();
  const currentRoom = useSelector((state: RootState) => state.house.currentRoom);
  const rooms = useSelector((state: RootState) => state.house.rooms);

  useEffect(() => {
    if (rooms.length === 0 && houseType !== 'Custom') {
      const defaultRooms = [
        'Living Room',
        'Master Bedroom',
        ...(houseType === '2BHK' || houseType === '3BHK' || houseType === '4BHK' ? ['Bedroom 2'] : []),
        ...(houseType === '3BHK' || houseType === '4BHK' ? ['Bedroom 3'] : []),
        ...(houseType === '4BHK' ? ['Bedroom 4'] : []),
        'Kitchen',
        'Bathroom'
      ];

      defaultRooms.forEach(roomName => {
        const newRoom: Room = {
          name: roomName,
          type: 'default',
          switchboards: [],
          attachedRooms: []
        };
        dispatch(addRoom(newRoom));
      });
    }
  }, [dispatch, houseType, rooms.length]);

  const handleAddCustomRoom = () => {
    const roomName = prompt('Enter room name:');
    if (roomName && !rooms.some(room => room.name === roomName)) {
      const newRoom: Room = {
        name: roomName,
        type: 'custom',
        switchboards: [],
        attachedRooms: []
      };
      dispatch(addRoom(newRoom));
    } else if (roomName) {
      alert('A room with this name already exists. Please choose a different name.');
    }
  };

  const handleRoomSelect = (roomName: string) => {
    dispatch(setCurrentRoom(roomName));
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-64 bg-gray-800 p-4">
        <button 
          onClick={onBack}
          className="flex items-center text-white mb-6 hover:text-blue-400 transition-colors"
        >
          <ChevronLeft className="mr-2" />
          Back to House Types
        </button>
        <h2 className="text-xl text-white font-bold mb-4">{houseType}</h2>
        
        {houseType === 'Custom' && rooms.length === 0 && (
          <div className="text-center py-4">
            <button
              onClick={handleAddCustomRoom}
              className="w-full flex items-center justify-center p-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <Plus className="mr-2" size={20} />
              Add Your First Room
            </button>
          </div>
        )}

        <div className="space-y-2">
          {rooms.map(room => (
            <motion.button
              key={room.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => handleRoomSelect(room.name)}
              className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                currentRoom === room.name 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Home className="mr-3" size={20} />
              {room.name}
            </motion.button>
          ))}
          
          {(rooms.length > 0 || houseType !== 'Custom') && (
            <button
              onClick={handleAddCustomRoom}
              className="w-full flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
            >
              <Plus className="mr-3" size={20} />
              Add Room
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 p-6">
        <AnimatePresence mode="wait">
          {currentRoom ? (
            <motion.div
              key={currentRoom}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <SwitchboardConfig roomName={currentRoom} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex items-center justify-center text-gray-400"
            >
              {rooms.length === 0 ? (
                <div className="text-center">
                  <h3 className="text-xl mb-4">Start by adding a room to your house</h3>
                  <button
                    onClick={handleAddCustomRoom}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    <Plus className="inline mr-2" size={20} />
                    Add First Room
                  </button>
                </div>
              ) : (
                'Select a room to configure switchboards'
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RoomConfiguration;