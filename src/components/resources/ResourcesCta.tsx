
import React from 'react';
import ConsultationButton from '@/components/ui/ConsultationButton';

const ResourcesCta: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-prosto-blue-light to-prosto-blue/20">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Узнайте больше о наших курсах</h2>
          <p className="text-lg mb-8 text-balance">
            Бесплатной консультации будет достаточно, чтобы понять, как наши курсы помогут именно вам
          </p>
          <ConsultationButton size="lg" />
        </div>
      </div>
    </section>
  );
};

export default ResourcesCta;
