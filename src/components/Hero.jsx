import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Terminal } from 'lucide-react';

const Hero = () => {
  return (
    <motion.section 
      className="glass-panel"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', zIndex: 1 }}
    >
      <div>
        <motion.h1 
          className="title"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          tessych
        </motion.h1>
        <motion.div 
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)' }}>
            <Terminal size={18} />
            <span>Fullstack + ML</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)' }}>
            <MapPin size={18} />
            <span>Новосибирск</span>
          </div>
        </motion.div>
      </div>

      <motion.p 
        className="subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        style={{ margin: 0, maxWidth: '600px' }}
      >
        Превращаю сложные идеи в элегантный код. Предпочитаю задачи из проектного программирования (кейсы). Чаще всего занимаю роли Fullstack или Backend разработчика.
      </motion.p>
    </motion.section>
  );
};

export default Hero;
