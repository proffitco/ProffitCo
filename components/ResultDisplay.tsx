
import React from 'react';
import type { AnalysisResult } from '../types';

interface ResultDisplayProps {
  result: AnalysisResult;
  onReset: () => void;
}

// A simple markdown-to-html renderer
const Markdown: React.FC<{ content: string }> = ({ content }) => {
    const htmlContent = content
        .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-primary mt-4 mb-2">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-gray-800 mt-6 mb-3">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-extrabold text-gray-900 mt-8 mb-4">$1</h1>')
        .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*)\*/g, '<em>$1</em>')
        .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
        .replace(/\n/g, '<br />');

    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 animate-fade-in">
        <div className="text-center border-b pb-6 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">Analysis Complete!</h2>
            <p className="text-gray-600 mt-1">Thank you for your submission. Our team has been notified and will be in touch shortly.</p>
            <p className="text-sm text-gray-500 mt-2">(A text message has been simulated to 970-710-9193)</p>
        </div>

        <div className="prose max-w-none text-gray-700">
            <h3 className="text-xl font-bold text-primary mb-4">Preliminary Property Analysis</h3>
            <div className="p-4 bg-gray-50 rounded-lg border">
                <Markdown content={result.mockAnalysis} />
            </div>
        </div>

        <div className="mt-8 text-center">
            <button
                onClick={onReset}
                className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-secondary transition-colors"
            >
                Submit Another Property
            </button>
        </div>
    </div>
  );
};
