
import { GoogleGenAI, Type } from "@google/genai";
import type { FormData, AnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateAnalysisAndTextMessage = async (formData: FormData): Promise<AnalysisResult> => {
    const prompt = `
        A property seller has submitted their information on QuantumHomeSales.com.
        Based on the data below, perform two tasks:
        1.  Create a concise SMS message to be sent to 970-710-9193 notifying them of the new lead. Include the seller's name, property address, and asking price.
        2.  Generate a "Preliminary Property Analysis" report. This is a simulation, so you must invent plausible data for the analysis. The analysis should look professional and reference data from sources like Zillow, county records, and rental estimators. It must include:
            - A summary of the seller's provided information.
            - A "Data Verification" section with invented but realistic values for Tax Assessed Value, recent comparable sales (at least 2), and estimated rental income (from Rentometer/Zillow).
            - A "Valuation Synopsis" providing a brief professional opinion on the seller's asking price based on your invented data.

        Seller's Data:
        - Name: ${formData.sellerName}
        - Property Address: ${formData.propertyAddress}
        - Email: ${formData.email}
        - Phone: ${formData.phone}
        - Seller's Estimated Value: $${formData.estimatedValue}
        - Desired Sales Price: $${formData.salesPrice}
        - Liens/Mortgage Owed: $${formData.liens}
        - Expected Net Profit: $${formData.expectedNet}
        - Occupancy Preference: ${formData.occupancy === 'delayed' ? 'Delayed Occupancy' : 'Upon Closing'}
        - Anticipated Fees: ${formData.anticipatedFees || 'None specified'}

        Return the result as a JSON object that matches the provided schema.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        smsMessage: {
                            type: Type.STRING,
                            description: "The SMS message for the agent."
                        },
                        mockAnalysis: {
                            type: Type.STRING,
                            description: "The full, formatted preliminary property analysis report as a single string, using markdown for formatting."
                        }
                    },
                    required: ["smsMessage", "mockAnalysis"]
                },
            },
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);

        if (result && result.smsMessage && result.mockAnalysis) {
            return result as AnalysisResult;
        } else {
            throw new Error("Invalid response structure from AI model.");
        }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate property analysis. Please check your connection and API key.");
    }
};
