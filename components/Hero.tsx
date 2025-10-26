
import React from 'react';

export const Hero: React.FC = () => {
    const scrollToForm = () => {
        document.getElementById('property-form')?.scrollIntoView({ behavior: 'smooth' });
    };

  return (
    <div className="text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
        Sell Your Home, <span className="text-primary">Exceptionally Fast</span>.
      </h2>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
        Tired of waiting? Submit your property details, and we'll provide you with a qualified buyer in just 24 hours. No showings, no lengthy negotiations.
      </p>
      <button
        onClick={scrollToForm}
        className="mt-8 bg-accent text-primary font-bold py-3 px-8 rounded-lg text-lg hover:opacity-90 transition-opacity transform hover:scale-105"
      >
        Get My 24-Hour Offer
      </button>
    </div>
  );
};
