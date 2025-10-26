
import React, { useState } from 'react';
import type { FormData } from '../types';
import { FormInput } from './FormInput';

interface PropertyFormProps {
  onSubmit: (formData: FormData) => void;
}

const initialFormData: FormData = {
  sellerName: '',
  propertyAddress: '',
  email: '',
  phone: '',
  estimatedValue: '',
  salesPrice: '',
  occupancy: 'closing',
  liens: '',
  expectedNet: '',
  anticipatedFees: '',
};

export const PropertyForm: React.FC<PropertyFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, occupancy: e.target.value as 'closing' | 'delayed' }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div id="property-form" className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">Seller Information Form</h3>
      <p className="text-center text-gray-500 mb-8">Fill out the details below to begin.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Contact & Property */}
        <div className="grid md:grid-cols-2 gap-6">
          <FormInput label="Full Name" name="sellerName" value={formData.sellerName} onChange={handleChange} required />
          <FormInput label="Property Address" name="propertyAddress" value={formData.propertyAddress} onChange={handleChange} required placeholder="123 Main St, Anytown, USA" />
          <FormInput label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
          <FormInput label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
        </div>

        <hr className="my-8" />

        {/* Section 2: Financials */}
        <h4 className="text-lg font-semibold text-primary border-b pb-2 mb-4">Property Financials</h4>
        <div className="grid md:grid-cols-2 gap-6">
            <FormInput label="Your Estimated Value ($)" name="estimatedValue" type="number" value={formData.estimatedValue} onChange={handleChange} required placeholder="e.g., 500000" />
            <FormInput label="Your Asking Price ($)" name="salesPrice" type="number" value={formData.salesPrice} onChange={handleChange} required placeholder="e.g., 495000" />
            <FormInput label="Liens / Amount Owed ($)" name="liens" type="number" value={formData.liens} onChange={handleChange} required placeholder="e.g., 250000" />
            <FormInput label="Expected Net Profit ($)" name="expectedNet" type="number" value={formData.expectedNet} onChange={handleChange} required placeholder="e.g., 200000" />
        </div>

        {/* Section 3: Timeline & Fees */}
        <hr className="my-8" />
        <div className="grid md:grid-cols-2 gap-6 items-start">
            <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">Occupancy Timeline</label>
                 <div className="flex items-center space-x-6 bg-gray-50 p-3 rounded-lg border">
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="radio" name="occupancy" value="closing" checked={formData.occupancy === 'closing'} onChange={handleRadioChange} className="form-radio text-primary focus:ring-secondary" />
                        <span>Upon Closing</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="radio" name="occupancy" value="delayed" checked={formData.occupancy === 'delayed'} onChange={handleRadioChange} className="form-radio text-primary focus:ring-secondary" />
                        <span>Delayed</span>
                    </label>
                 </div>
            </div>
             <div>
                <label htmlFor="anticipatedFees" className="block text-sm font-medium text-gray-700">Anticipated Fees (optional)</label>
                <textarea
                    id="anticipatedFees"
                    name="anticipatedFees"
                    value={formData.anticipatedFees}
                    onChange={handleChange}
                    rows={3}
                    placeholder="e.g., HOA transfer fees, specific repairs..."
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
            </div>
        </div>

        <div className="pt-6 text-center">
            <button type="submit" className="w-full md:w-auto bg-primary text-white font-bold py-3 px-12 rounded-lg text-lg hover:bg-secondary transition-colors transform hover:scale-105">
                Analyze My Property
            </button>
        </div>
      </form>
    </div>
  );
};
