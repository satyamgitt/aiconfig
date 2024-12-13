import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightbulb, Fan, Tv, DoorClosed, Power, Trash2, X, Plus, 
  Wifi, Camera, Speaker, Thermometer, Lock, Phone,
  Smartphone, Mic, Radio, Printer, Monitor, Coffee,
  Lamp, Wind, VideoIcon, Gamepad, Music, Bluetooth
} from 'lucide-react';
import { Switchboard, Switch, BoardType } from '../store/types';

interface SwitchboardListProps {
  switchboards: Switchboard[];
  material: string;
  onAddSwitch: (switchboardId: string, type: string) => void;
  onRemoveSwitch: (switchboardId: string, switchId: string) => void;
  onRemoveSwitchboard: (switchboardId: string) => void;
  onToggleRocker: (switchboardId: string, switchId: string, currentValue: boolean) => void;
  onBoardTypeChange: (boardId: string, type: BoardType) => void;
  startIndex: number;
}

const SwitchboardList: React.FC<SwitchboardListProps> = ({
  switchboards,
  material,
  onAddSwitch,
  onRemoveSwitch,
  onRemoveSwitchboard,
  onToggleRocker,
  onBoardTypeChange,
  startIndex
}) => {
  const [hoveredBoard, setHoveredBoard] = useState<string | null>(null);
  const [showMoreOptions, setShowMoreOptions] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const primarySwitchTypes = [
    { name: 'Light', icon: Lightbulb },
    { name: 'Fan', icon: Fan },
    { name: 'TV', icon: Tv },
    { name: 'Door', icon: DoorClosed },
    { name: 'Socket', icon: Power },
  ];

  const additionalSwitchTypes = [
    // Entertainment
    { category: 'Entertainment', items: [
      { name: 'Speaker', icon: Speaker },
      { name: 'TV Box', icon: Tv },
      { name: 'Gaming', icon: Gamepad },
      { name: 'Projector', icon: VideoIcon },
      { name: 'Music', icon: Music },
      { name: 'Radio', icon: Radio },
    ]},
    // Security
    { category: 'Security', items: [
      { name: 'Camera', icon: Camera },
      { name: 'Security', icon: Lock },
      { name: 'Intercom', icon: Phone },
      { name: 'Monitor', icon: Monitor },
    ]},
    // Smart Devices
    { category: 'Smart Devices', items: [
      { name: 'WiFi', icon: Wifi },
      { name: 'Bluetooth', icon: Bluetooth },
      { name: 'Smart Phone', icon: Smartphone },
      { name: 'Microphone', icon: Mic },
      { name: 'Printer', icon: Printer },
    ]},
    // Comfort
    { category: 'Comfort', items: [
      { name: 'Temperature', icon: Thermometer },
      { name: 'Coffee Maker', icon: Coffee },
      { name: 'Table Lamp', icon: Lamp },
      { name: 'Ventilation', icon: Wind },
    ]},
  ];

  const filteredSwitchTypes = searchTerm
    ? additionalSwitchTypes.map(category => ({
        category: category.category,
        items: category.items.filter(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.items.length > 0)
    : additionalSwitchTypes;

  const getBoardStyle = (material: string) => {
    const baseStyle = 'relative rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] w-[320px] h-[280px] overflow-hidden';
    
    switch (material) {
      case 'wood':
        return `${baseStyle} bg-[linear-gradient(135deg,#f3e6d8,#e6d5c3)] before:absolute before:inset-0 before:bg-[url('https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=1000')] before:opacity-30 before:bg-cover before:rounded-3xl before:z-0`;
      case 'glass':
        return `${baseStyle} bg-gradient-to-br from-white/40 to-white/20 border border-white/30`;
      default:
        return `${baseStyle} bg-gradient-to-br from-gray-100 to-gray-50`;
    }
  };

  const getSwitchStyle = (material: string) => {
    const baseStyle = 'relative p-2 rounded-lg transition-all duration-200 group';
    
    switch (material) {
      case 'wood':
        return `${baseStyle} bg-[#654321]/20 hover:bg-[#654321]/30`;
      case 'glass':
        return `${baseStyle} bg-white/10 hover:bg-white/20 backdrop-blur-md`;
      default:
        return `${baseStyle} bg-gray-200/90 hover:bg-gray-300/90`;
    }
  };

  const handleSensorTypeChange = (boardId: string, isSensor: boolean) => {
    if (isSensor) {
      onBoardTypeChange(boardId, 'open');
    } else {
      onBoardTypeChange(boardId, 'none');
    }
  };

  const renderBoardTypeSelector = (board: Switchboard) => {
    const isSensor = board.boardType === 'sensor' || board.boardType === 'open' || board.boardType === 'discrete';
    
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 mb-2 p-1 rounded-lg bg-black/5 backdrop-blur-sm">
          <motion.label
            className={`flex-1 px-2 py-1 rounded-md cursor-pointer text-center transition-colors ${
              isSensor ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-black/5'
            }`}
          >
            <input
              type="radio"
              name={`boardType-${board.id}`}
              checked={isSensor}
              onChange={() => handleSensorTypeChange(board.id, true)}
              className="sr-only"
            />
            <span className="text-xs font-medium block">Sensor</span>
          </motion.label>
          <motion.label
            className={`flex-1 px-2 py-1 rounded-md cursor-pointer text-center transition-colors ${
              !isSensor ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-black/5'
            }`}
          >
            <input
              type="radio"
              name={`boardType-${board.id}`}
              checked={!isSensor}
              onChange={() => handleSensorTypeChange(board.id, false)}
              className="sr-only"
            />
            <span className="text-xs font-medium block">Non-Sensor</span>
          </motion.label>
        </div>

        {isSensor && (
          <div className="flex items-center gap-1 p-1 rounded-lg bg-black/5 backdrop-blur-sm">
            <motion.label
              className={`flex-1 px-2 py-1 rounded-md cursor-pointer text-center transition-colors ${
                board.boardType === 'open' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-black/5'
              }`}
            >
              <input
                type="radio"
                name={`sensorType-${board.id}`}
                checked={board.boardType === 'open'}
                onChange={() => onBoardTypeChange(board.id, 'open')}
                className="sr-only"
              />
              <span className="text-xs font-medium block">Open</span>
            </motion.label>
            <motion.label
              className={`flex-1 px-2 py-1 rounded-md cursor-pointer text-center transition-colors ${
                board.boardType === 'discrete' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-black/5'
              }`}
            >
              <input
                type="radio"
                name={`sensorType-${board.id}`}
                checked={board.boardType === 'discrete'}
                onChange={() => onBoardTypeChange(board.id, 'discrete')}
                className="sr-only"
              />
              <span className="text-xs font-medium block">Discrete</span>
            </motion.label>
          </div>
        )}
      </div>
    );
  };

  return (
    <AnimatePresence>
      <motion.div 
        layout="position"
        className="flex flex-wrap gap-6"
      >
        {switchboards.map((board, index) => (
          <motion.div
            key={board.id}
            layout="position"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${getBoardStyle(material)}`}
            onMouseEnter={() => setHoveredBoard(board.id)}
            onMouseLeave={() => {
              setHoveredBoard(null);
              setShowMoreOptions(null);
              setSearchTerm('');
            }}
          >
            <div className="relative z-10 h-full flex flex-col p-3">
              <button
                onClick={() => onRemoveSwitchboard(board.id)}
                className="absolute -top-1 -right-1 p-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors"
              >
                <X size={14} />
              </button>

              <div className="flex justify-between items-center mb-2">
                <div className="text-xs font-medium text-gray-700">
                  Switchboard {startIndex + index + 1}
                </div>
                <div className="text-xs text-gray-500">
                  {board.switches.length}/8
                </div>
              </div>

              {renderBoardTypeSelector(board)}

              {board.switches.length < 8 && (
                <div className="relative">
                  <div className="grid grid-cols-5 gap-1 mb-2">
                    {primarySwitchTypes.map(({ name, icon: Icon }) => (
                      <button
                        key={name}
                        onClick={() => onAddSwitch(board.id, name)}
                        className="p-1.5 rounded-lg bg-black/5 hover:bg-black/10 transition-colors"
                        title={`Add ${name} Switch`}
                      >
                        <Icon className="w-3.5 h-3.5 text-gray-600" />
                      </button>
                    ))}
                  </div>
                  
                  {hoveredBoard === board.id && (
                    <div className="absolute right-0 top-0">
                      <button
                        onClick={() => setShowMoreOptions(showMoreOptions === board.id ? null : board.id)}
                        className="p-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                        title="More Options"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      
                      <AnimatePresence>
                        {showMoreOptions === board.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute right-0 mt-2 p-2 bg-white rounded-lg shadow-xl w-[280px]"
                            style={{ maxHeight: '400px' }}
                          >
                            <div className="sticky top-0 bg-white pb-2 mb-2 border-b">
                              <input
                                type="text"
                                placeholder="Search switches..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div className="overflow-y-auto max-h-[320px] pr-2 -mr-2">
                              {filteredSwitchTypes.map((category) => (
                                category.items.length > 0 && (
                                  <div key={category.category} className="mb-4 last:mb-0">
                                    <h3 className="text-xs font-semibold text-gray-500 mb-2 px-2">
                                      {category.category}
                                    </h3>
                                    <div className="grid grid-cols-3 gap-1">
                                      {category.items.map(({ name, icon: Icon }) => (
                                        <button
                                          key={name}
                                          onClick={() => {
                                            onAddSwitch(board.id, name);
                                            setShowMoreOptions(null);
                                            setSearchTerm('');
                                          }}
                                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex flex-col items-center gap-1"
                                          title={`Add ${name} Switch`}
                                        >
                                          <Icon className="w-4 h-4 text-gray-600" />
                                          <span className="text-xs text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">
                                            {name}
                                          </span>
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pr-1">
                {board.switches.map((switch_) => {
                  const allSwitchTypes = [
                    ...primarySwitchTypes,
                    ...additionalSwitchTypes.flatMap(category => category.items)
                  ];
                  const IconComponent = allSwitchTypes.find(t => t.name === switch_.type)?.icon || Lightbulb;
                  return (
                    <motion.div
                      key={switch_.id}
                      layout="position"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={getSwitchStyle(material)}
                    >
                      <button
                        onClick={() => onRemoveSwitch(board.id, switch_.id)}
                        className="absolute -top-1 -right-1 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={10} />
                      </button>
                      
                      <div className="flex items-center justify-between mb-1">
                        <IconComponent className="w-4 h-4 text-gray-700" />
                        {material === 'wood' && switch_.features.rocker && (
                          <div className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                        )}
                      </div>
                      
                      <label className="flex items-center gap-1 cursor-pointer group/label">
                        <input
                          type="checkbox"
                          checked={switch_.features.rocker}
                          onChange={() => onToggleRocker(board.id, switch_.id, switch_.features.rocker)}
                          className="form-checkbox h-3 w-3 text-blue-500 rounded transition-colors"
                        />
                        <span className="text-[10px] text-gray-600 group-hover/label:text-gray-900 transition-colors">
                          Rocker
                        </span>
                      </label>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default SwitchboardList;