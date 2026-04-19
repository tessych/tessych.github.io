import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const Experience = () => {
  return (
    <motion.section 
      className="glass-panel"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      style={{ zIndex: 1 }}
    >
      <h2 className="section-title">Опыт</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <motion.div 
          style={{ display: 'flex', gap: '1.5rem' }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: 'var(--accent-color)' 
          }}>
            <div style={{ 
              width: '40px', height: '40px', 
              borderRadius: '50%', 
              background: 'rgba(255,255,255,0.05)',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              border: '1px solid var(--glass-border)'
            }}>
              <Briefcase size={18} />
            </div>
            <div style={{ flex: 1, width: '1px', background: 'var(--glass-border)' }}></div>
          </div>
          
          <div style={{ paddingBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Backend Разработчик & Фуллстек</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5, maxWidth: '600px' }}>
              Разработка надежных бекенд-решений на Go и Python. Проектирование REST API, изучение gRPC, настройка Unit-тестов. Глубокий опыт работы с базами данных (PostgreSQL, Redis, MongoDB). Уверенно использую Nginx, Ngrok и Docker Compose для конфигурирования и развертывания проектов.
            </p>
          </div>
        </motion.div>

        <motion.div 
          style={{ display: 'flex', gap: '1.5rem' }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: 'var(--accent-color)' 
          }}>
            <div style={{ 
              width: '40px', height: '40px', 
              borderRadius: '50%', 
              background: 'rgba(255,255,255,0.05)',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              border: '1px solid var(--glass-border)'
            }}>
              <Briefcase size={18} />
            </div>
          </div>
          
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>ML / Олимпиадное программирование</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5, maxWidth: '600px' }}>
              Использование Python (PyTorch, TensorFlow) для задач машинного обучения. Решение олимпиадных задач на C++ с жесткими лимитами по времени (TL).
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Experience;
