
import React from 'react';
import ConsultationButton from '@/components/ui/ConsultationButton';

const HeroSection: React.FC = () => {
  return (
    <section className="py-12 md:py-24 bg-prosto-blue-light/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Банк заданий ЕГЭ по биологии</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 text-balance mx-auto max-w-2xl">
            Практикуйтесь с заданиями разных типов и уровней сложности, чтобы лучше подготовиться к экзамену
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <ConsultationButton size="lg" className="w-full sm:w-auto justify-center" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
