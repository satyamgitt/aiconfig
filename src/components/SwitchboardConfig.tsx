import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from 'lucide-react';
import { RootState } from '../store/store';
import { 
  addSwitchboard, 
  removeSwitchboard,
  addSwitch, 
  removeSwitch,
  updateBoardType,
  updateSwitchFeatures 
} from '../store/houseSlice';
import { Switchboard, Switch, BoardType } from '../store/types';
import SwitchboardList from './SwitchboardList';

interface SwitchboardConfigProps {
  roomName: string;
  isAttached?: boolean;
}

const SwitchboardConfig: React.FC<SwitchboardConfigProps> = ({ roomName, isAttached = false }) => {
  const dispatch = useDispatch();
  const room = useSelector((state: RootState) => 
    state.house.rooms.find(r => r.name === roomName)
  );
  const [selectedMaterial, setSelectedMaterial] = useState<'glass' | 'wood' | 'plastic'>('plastic');
  const [showMainBoardOptions, setShowMainBoardOptions] = useState(false);
  const [showAttachedBoardOptions, setShowAttachedBoardOptions] = useState(false);

  const handleAddSwitchboards = (count: number, isAttached: boolean = false) => {
    Array.from({ length: count }).forEach(() => {
      const newSwitchboard: Switchboard = {
        id: '', // Will be assigned by the reducer
        material: selectedMaterial,
        switches: []
      };
      dispatch(addSwitchboard({ roomName, switchboard: newSwitchboard, isAttached }));
    });
    if (isAttached) {
      setShowAttachedBoardOptions(false);
    } else {
      setShowMainBoardOptions(false);
    }
  };

  const handleRemoveSwitchboard = (switchboardId: string, isAttached: boolean = false) => {
    dispatch(removeSwitchboard({ roomName, switchboardId, isAttached }));
  };

  const handleAddSwitch = (switchboardId: string, type: string, isAttached: boolean = false) => {
    const newSwitch: Switch = {
      id: '', // Will be assigned by the reducer
      type,
      features: {
        rocker: false
      }
    };
    dispatch(addSwitch({ roomName, switchboardId, switch: newSwitch, isAttached }));
  };

  const handleRemoveSwitch = (switchboardId: string, switchId: string, isAttached: boolean = false) => {
    dispatch(removeSwitch({ roomName, switchboardId, switchId, isAttached }));
  };

  const handleToggleRocker = (switchboardId: string, switchId: string, currentValue: boolean, isAttached: boolean = false) => {
    dispatch(updateSwitchFeatures({
      roomName,
      switchboardId,
      switchId,
      features: { rocker: !currentValue },
      isAttached
    }));
  };

  const handleBoardTypeChange = (boardId: string, type: BoardType, isAttached: boolean = false) => {
    dispatch(updateBoardType({ roomName, boardId, boardType: type, isAttached }));
  };

  if (!room) return null;

  const mainSwitchboards = room.switchboards;
  const attachedSwitchboards = room.attachedRooms[0]?.switchboards || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{room.name} Configuration</h2>
        <div className="flex items-center gap-4">
          <select
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value as any)}
            className="bg-gray-700 text-white rounded-lg px-4 py-2"
          >
            <option value="plastic">Plastic</option>
            <option value="wood">Wood</option>
            <option value="glass">Glass</option>
          </select>

          <div className="relative">
            <button
              onClick={() => setShowMainBoardOptions(prev => !prev)}
              onBlur={() => setTimeout(() => setShowMainBoardOptions(false), 200)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Add Main Switchboard
            </button>
            
            {showMainBoardOptions && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-gray-800 rounded-lg shadow-xl z-50">
                {[1, 2, 3, 4, 5].map(num => (
                  <button
                    key={num}
                    onClick={() => handleAddSwitchboards(num)}
                    className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors"
                  >
                    Add {num} Switchboard{num > 1 ? 's' : ''}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Main Switchboards</h3>
          <SwitchboardList
            switchboards={mainSwitchboards}
            material={selectedMaterial}
            onAddSwitch={(id, type) => handleAddSwitch(id, type)}
            onRemoveSwitch={(boardId, switchId) => handleRemoveSwitch(boardId, switchId)}
            onRemoveSwitchboard={(id) => handleRemoveSwitchboard(id)}
            onToggleRocker={(boardId, switchId, value) => handleToggleRocker(boardId, switchId, value)}
            onBoardTypeChange={(boardId, type) => handleBoardTypeChange(boardId, type)}
            startIndex={0}
          />
        </div>

        {!isAttached && (
          <div className="border-l-2 border-blue-500 pl-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Attached Switchboards</h3>
              <div className="relative">
                <button
                  onClick={() => setShowAttachedBoardOptions(prev => !prev)}
                  onBlur={() => setTimeout(() => setShowAttachedBoardOptions(false), 200)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Plus size={20} />
                  Add Attached Switchboard
                </button>
                
                {showAttachedBoardOptions && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-gray-800 rounded-lg shadow-xl z-50">
                    {[1, 2, 3, 4, 5].map(num => (
                      <button
                        key={num}
                        onClick={() => handleAddSwitchboards(num, true)}
                        className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors"
                      >
                        Add {num} Switchboard{num > 1 ? 's' : ''}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {attachedSwitchboards.length > 0 && (
              <SwitchboardList
                switchboards={attachedSwitchboards}
                material={selectedMaterial}
                onAddSwitch={(id, type) => handleAddSwitch(id, type, true)}
                onRemoveSwitch={(boardId, switchId) => handleRemoveSwitch(boardId, switchId, true)}
                onRemoveSwitchboard={(id) => handleRemoveSwitchboard(id, true)}
                onToggleRocker={(boardId, switchId, value) => handleToggleRocker(boardId, switchId, value, true)}
                onBoardTypeChange={(boardId, type) => handleBoardTypeChange(boardId, type, true)}
                startIndex={mainSwitchboards.length}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SwitchboardConfig;