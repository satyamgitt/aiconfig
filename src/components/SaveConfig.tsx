import React from 'react';
import { useSelector } from 'react-redux';
import { Save } from 'lucide-react';
import { RootState } from '../store/store';

const SaveConfig: React.FC = () => {
  const { rooms, selectedType } = useSelector((state: RootState) => state.house);
  const user = useSelector((state: RootState) => state.auth.user);

  console.log("data" , rooms)
  const handleSave = () => {
    const configuration = {
      userId: user?.uid,
      timestamp: new Date().toISOString(),
      houseType: selectedType,
      rooms: rooms.map(room => ({
        id: room.id,
        name: room.name,
        type: room.type,
        switchboards: room.switchboards.map(board => ({
          id: board.id,
          material: board.material,
          boardType: board.boardType,
          switches: board.switches.map(switch_ => ({
            id: switch_.id,
            type: switch_.type,
            features: { ...switch_.features }
          }))
        })),
        attachedRooms: room.attachedRooms.map(attached => ({
          id: attached.id,
          name: attached.name,
          type: attached.type,
          switchboards: attached.switchboards.map(board => ({
            id: board.id,
            material: board.material,
            boardType: board.boardType,
            switches: board.switches.map(switch_ => ({
              id: switch_.id,
              type: switch_.type,
              features: { ...switch_.features }
            }))
          }))
        }))
      }))
    };

    console.log('Configuration to send:', JSON.stringify(configuration, null, 2));
    // You can now send this configuration to your API
  };

  return (
    <button
      onClick={handleSave}
      className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg transition-colors flex items-center gap-2"
    >
      <Save size={20} />
      Save Configuration
    </button>
  );
};

export default SaveConfig;