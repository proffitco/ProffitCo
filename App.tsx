
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PropertyForm } from './components/PropertyForm';
import { Loader } from './components/Loader';
import { ResultDisplay } from './components/ResultDisplay';
import type { FormData, AnalysisResult } from './types';
import { generateAnalysisAndTextMessage } from './services/geminiService';

const App: React.FC = () => {
  const [formState, setFormState] = useState<'initial' | 'loading' | 'success' | 'error'>('initial');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (formData: FormData) => {
    setFormState('loading');
    setError(null);
    try {
      const analysisResult = await generateAnalysisAndTextMessage(formData);
      setResult(analysisResult);
      setFormState('success');
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
      setError(`Failed to analyze property. ${errorMessage}`);
      setFormState('error');
    }
  };

  const handleReset = () => {
    setFormState('initial');
    setResult(null);
    setError(null);
  };

  const renderContent = () => {
    switch (formState) {
      case 'initial':
        return <PropertyForm onSubmit={handleFormSubmit} />;
      case 'loading':
        return <Loader message="Analyzing your property data..." />;
      case 'success':
        return result && <ResultDisplay result={result} onReset={handleReset} />;
      case 'error':
        return (
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-600">Submission Failed</h2>
            <p className="mt-2 text-gray-600">{error}</p>
            <button
              onClick={handleReset}
              className="mt-6 bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-secondary transition-colors"
            >
              Try Again
            </button>
          </div>
        );
      default:
        return <PropertyForm onSubmit={handleFormSubmit} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-16">
        {formState === 'initial' && <Hero />}
        <div className="mt-12 max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </main>
      <footer className="text-center py-6 bg-white border-t">
        <p className="text-gray-500">&copy; {new Date().getFullYear()} QuantumHomeSales.com. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
