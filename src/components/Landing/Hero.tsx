import React from 'react';
import { motion } from 'framer-motion';
import { Icons } from '../ui/icons';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1558211583-d26f610c1eb1?auto=format&fit=crop&q=80&w=1920")',
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Transform Your Home
              <br />
              <span className="text-blue-400">Into a Haven of Peace</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Experience the perfect harmony of technology and tranquility with our smart switchboards.
              Create a space where comfort meets innovation.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button 
                onClick={onGetStarted}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Begin Your Journey
                <Icons.ChevronRight size={20} />
              </motion.button>
              <motion.button 
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg flex items-center gap-2 backdrop-blur-sm transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
                <Icons.Play size={20} />
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <SmartHomePreview />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const SmartHomePreview = () => {
  return (
    <div className="relative">
      <motion.div 
        className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div 
        className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="grid grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="bg-white/5 backdrop-blur-sm p-4 rounded-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <Icons.Power className="text-blue-400" size={24} />
                <motion.div 
                  className="w-2 h-2 rounded-full bg-blue-400"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="space-y-2">
                <div className="h-1 bg-white/20 rounded-full" />
                <div className="h-1 bg-white/20 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;