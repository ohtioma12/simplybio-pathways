
import React from 'react';
import ConsultationButton from '@/components/ui/ConsultationButton';
import { motion } from 'framer-motion';

const CtaSection: React.FC = () => {
  return (
    <section className="py-12 md:py-24 bg-gradient-to-r from-prosto-blue-light to-prosto-blue/20">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-2xl md:text-4xl font-bold mb-4 md:mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Нужна помощь с подготовкой?
          </motion.h2>
          <motion.p 
            className="text-base md:text-lg mb-6 md:mb-8 text-balance mx-auto max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Запишитесь на бесплатную консультацию, и мы расскажем, как наши курсы помогут вам успешно сдать ЕГЭ
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ConsultationButton size="lg" className="w-full sm:w-auto justify-center" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
