import React from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import SwitchboardConfig from './SwitchboardConfig';
import { Room } from '../store/types';

interface AttachedRoomProps {
  room: Room;
  parentRoomId: string;
}

const AttachedRoom: React.FC<AttachedRoomProps> = ({ room, parentRoomId }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mt-6 border-l-2 border-blue-500 pl-4"
    >
      <h3 className="text-xl font-semibold text-white mb-4">
        Attached {room.name}
      </h3>
      <SwitchboardConfig roomId={room.id} isAttached={true} />
    </motion.div>
  );
};

export default AttachedRoom;