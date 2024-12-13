import React from 'react';
import { useDispatch } from 'react-redux';
import { Building, Building2, HomeIcon, Warehouse, Plus } from 'lucide-react';
import { setHouseType } from '../store/houseSlice';
import { HouseType } from '../store/types';

interface HouseTypeSelectorProps {
  onSelect: (type: HouseType) => void;
}

const HouseTypeSelector: React.FC<HouseTypeSelectorProps> = ({ onSelect }) => {
  const dispatch = useDispatch();

  const handleSelect = (type: HouseType) => {
    dispatch(setHouseType(type));
    onSelect(type);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div 
        className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1558211583-d26f610c1eb1?auto=format&fit=crop&q=80&w=1920")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            Smart Home Configuration
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { type: '1BHK', icon: Building, color: 'from-green-400 to-emerald-600' },
              { type: '2BHK', icon: Building2, color: 'from-blue-400 to-indigo-600' },
              { type: '3BHK', icon: HomeIcon, color: 'from-purple-400 to-pink-600' },
              { type: '4BHK', icon: Warehouse, color: 'from-orange-400 to-red-600' },
              { type: 'Custom', icon: Plus, color: 'from-gray-400 to-gray-600' },
            ].map(({ type, icon: Icon, color }) => (
              <button
                key={type}
                onClick={() => handleSelect(type as HouseType)}
                className={`bg-gradient-to-br ${color} hover:scale-105 transform transition-all duration-200 
                  text-white rounded-xl p-6 flex flex-col items-center justify-center gap-4 shadow-lg group`}
              >
                <Icon className="group-hover:rotate-12 transition-transform" size={48} />
                <span className="text-xl font-semibold">{type}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseTypeSelector;