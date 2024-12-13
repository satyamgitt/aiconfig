import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from '../ui/icons';

const MobileControlled = () => {
  const [activeSwitch, setActiveSwitch] = useState<string | null>(null);
  const [isPhoneTilted, setIsPhoneTilted] = useState(false);

  const switches = [
    { id: 'light1', icon: Icons.Lightbulb, label: 'Living Room Light' },
    { id: 'fan1', icon: Icons.Fan, label: 'Ceiling Fan' },
    { id: 'tv1', icon: Icons.Tv, label: 'Smart TV' }
  ];

  const handleSwitchToggle = (switchId: string) => {
    setActiveSwitch(activeSwitch === switchId ? null : switchId);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Control at Your Fingertips
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience the future of home automation with our mobile-controlled smart switchboards
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Mobile Phone */}
          <motion.div
            className="relative"
            animate={{ rotateY: isPhoneTilted ? 10 : 0 }}
            transition={{ duration: 0.5 }}
            onHoverStart={() => setIsPhoneTilted(true)}
            onHoverEnd={() => setIsPhoneTilted(false)}
          >
            <div className="relative mx-auto w-[300px] h-[600px] bg-gray-900 rounded-[3rem] border-4 border-gray-800 p-4 shadow-2xl">
              {/* Phone Screen */}
              <div className="h-full w-full bg-gray-800 rounded-[2.5rem] p-6 overflow-hidden">
                <div className="space-y-6">
                  {switches.map((switch_) => (
                    <motion.button
                      key={switch_.id}
                      onClick={() => handleSwitchToggle(switch_.id)}
                      className={`w-full p-4 rounded-xl flex items-center justify-between ${
                        activeSwitch === switch_.id 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-700 text-gray-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <switch_.icon size={24} />
                        <span>{switch_.label}</span>
                      </div>
                      <motion.div
                        className={`w-12 h-6 rounded-full p-1 ${
                          activeSwitch === switch_.id ? 'bg-blue-400' : 'bg-gray-600'
                        }`}
                      >
                        <motion.div
                          className="w-4 h-4 bg-white rounded-full"
                          animate={{
                            x: activeSwitch === switch_.id ? 24 : 0
                          }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </motion.div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Switchboard Preview */}
          <div className="relative">
            <motion.div
              className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                {switches.map((switch_, index) => (
                  <motion.div
                    key={switch_.id}
                    className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl ${
                      activeSwitch === switch_.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    animate={{
                      scale: activeSwitch === switch_.id ? 1.05 : 1,
                      opacity: activeSwitch === switch_.id ? 1 : 0.7
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <switch_.icon 
                        className={activeSwitch === switch_.id ? 'text-blue-400' : 'text-gray-400'} 
                        size={24} 
                      />
                      <motion.div 
                        className={`w-2 h-2 rounded-full ${
                          activeSwitch === switch_.id ? 'bg-blue-400' : 'bg-gray-500'
                        }`}
                        animate={activeSwitch === switch_.id ? {
                          scale: [1, 1.5, 1],
                          opacity: [1, 0.8, 1]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <p className="text-sm text-gray-400">{switch_.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileControlled;