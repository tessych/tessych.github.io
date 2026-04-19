import React from 'react';
import { motion } from 'framer-motion';

const SakuraBranch = () => {
  return (
    <div style={{
      position: 'fixed',
      top: '10%',
      left: 0,
      width: '600px', // Настрой под размер своей картинки
      height: '400px',
      zIndex: 0,
      pointerEvents: 'none',
      // Отражаем по горизонтали, чтобы она росла СЛЕВА, так как на оригинале она растет справа
      transform: 'scaleX(-1)' 
    }}>
      <motion.div
        initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }} // Начинаем скрытой Справа (так как отражено, это лево)
        animate={{ clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)' }} // Открываем влево (на экране вправо)
        transition={{ duration: 4, ease: 'easeOut', delay: 0.5 }}
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/sakura.png")', // <-- ПУТЬ К ТВОЕЙ КАРТИНКЕ
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left center', // Изменено на left center для лучшего позиционирования
          filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.1)) contrast(1.2)',
          mixBlendMode: 'screen', // Это уберет черный фон картинок!
          opacity: 0.6 // немного прозрачности для эстетики
        }}
      />
    </div>
  );
};

export default SakuraBranch;
