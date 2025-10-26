
export interface FormData {
  sellerName: string;
  propertyAddress: string;
  email: string;
  phone: string;
  estimatedValue: string;
  salesPrice: string;
  occupancy: 'closing' | 'delayed';
  liens: string;
  expectedNet: string;
  anticipatedFees: string;
}

export interface AnalysisResult {
    smsMessage: string;
    mockAnalysis: string;
}
