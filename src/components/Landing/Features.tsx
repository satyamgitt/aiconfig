import React from 'react';
import { motion } from 'framer-motion';
import { Icons } from '../ui/icons';

const features = [
  {
    icon: Icons.Zap,
    title: 'Smart Controls',
    description: 'Experience effortless control with intelligent switchboards that adapt to your lifestyle.',
    color: 'blue'
  },
  {
    icon: Icons.Shield,
    title: 'Peace of Mind',
    description: 'Rest easy knowing your home is protected with advanced safety features.',
    color: 'green'
  },
  {
    icon: Icons.Heart,
    title: 'Family Comfort',
    description: 'Create the perfect environment for your loved ones with customizable settings.',
    color: 'red'
  },
  {
    icon: Icons.Sparkles,
    title: 'Elegant Design',
    description: 'Enhance your homes aesthetic with beautifully crafted switchboards.',
    color: 'purple'
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Transform Your Living Space
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience the perfect harmony of innovation and tranquility with our smart home solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 transition-all"
            >
              <div className={`w-12 h-12 bg-${feature.color}-500/10 rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className={`text-${feature.color}-400`} size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;