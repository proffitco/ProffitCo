
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold text-primary">
          QuantumHomeSales.com
        </h1>
        <p className="text-gray-500">Your 24-Hour Buyer is Waiting.</p>
      </div>
    </header>
  );
};
