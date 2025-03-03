
import React from 'react';
import ConsultationButton from '@/components/ui/ConsultationButton';

const CtaSection: React.FC = () => {
  return (
    <section className="py-12 md:py-24 bg-gradient-to-r from-prosto-blue-light to-prosto-blue/20">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">Нужна помощь с подготовкой?</h2>
          <p className="text-base md:text-lg mb-6 md:mb-8 text-balance mx-auto max-w-2xl">
            Запишитесь на бесплатную консультацию, и мы расскажем, как наши курсы помогут вам успешно сдать ЕГЭ
          </p>
          <ConsultationButton size="lg" className="w-full sm:w-auto justify-center" />
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
