// frontend/src/components/common/ProfileDetailModal.js
import React, { useState } from 'react';
import { API_BASE_URL } from '../../utils/apiConfig'; // Impor URL API

const ProfileDetailModal = ({ node, onClose, translations }) => {
    const [generatedJobDescription, setGeneratedJobDescription] = useState('');
    const [isLoadingJobDescription, setIsLoadingJobDescription] = useState(false);
    const [llmError, setLlmError] = useState('');

    const generateJobDescription = async () => {
        setIsLoadingJobDescription(true);
        setLlmError('');
        setGeneratedJobDescription('');

        try {
            const prompt = `Generate a concise and professional job description for ${node.title}, ${node.name}. Focus on key responsibilities and required skills.`;
            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });

            const payload = { contents: chatHistory };
            const apiKey = ""; // Canvas runtime akan menyediakan ini
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                setGeneratedJobDescription(text);
            } else {
                setLlmError(translations.failedToGenerateJD);
                console.error('Unexpected LLM response structure:', result);
            }
        } catch (error) {
            setLlmError(translations.connectionErrorLLM);
            console.error('Error calling Gemini API:', error);
        } finally {
            setIsLoadingJobDescription(false);
        }
    };

    if (!node) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all duration-300 scale-100 opacity-100">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{node.name}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 text-3xl font-light leading-none"
                        aria-label={translations.close}
                    >
                        &times;
                    </button>
                </div>
                {node.photo && (
                    <div className="flex justify-center mb-4">
                        <img src={node.photo} alt={node.name} className="w-24 h-24 rounded-full object-cover border-4 border-blue-200 shadow-md" />
                    </div>
                )}
                <div className="space-y-3">
                    <p className="text-gray-700 dark:text-gray-200"><span className="font-semibold">{translations.position}:</span> {node.title}</p>
                    {node.email && <p className="text-gray-700 dark:text-gray-200"><span className="font-semibold">{translations.email}:</span> <a href={`mailto:${node.email}`} className="text-blue-600 hover:underline">{node.email}</a></p>}
                    {node.phone && <p className="text-gray-700 dark:text-gray-200"><span className="font-semibold">{translations.phone}:</span> {node.phone}</p>}
                    {node.description && <p className="text-gray-700 dark:text-gray-200"><span className="font-semibold">{translations.description}:</span> {node.description}</p>}
                </div>

                <div className="mt-6 border-t border-gray-200 dark:border-gray-600 pt-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">{translations.llmFeatures}</h3>
                    <button
                        onClick={generateJobDescription}
                        disabled={isLoadingJobDescription}
                        className={`w-full py-2 px-4 rounded-md font-bold transition duration-200 ease-in-out shadow-md hover:shadow-lg
                    ${isLoadingJobDescription ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                    >
                        {isLoadingJobDescription ? translations.generatingJobDescription : translations.generateJobDescription}
                    </button>

                    {llmError && (
                        <p className="text-red-500 text-sm mt-2">{llmError}</p>
                    )}

                    {generatedJobDescription && (
                        <div className="mt-4 p-4 bg-green-50 dark:bg-green-800 rounded-lg border border-green-200 dark:border-green-600">
                            <h4 className="font-semibold text-green-800 dark:text-green-100 mb-2">{translations.generatedJD}</h4>
                            <p className="text-green-700 dark:text-green-200 whitespace-pre-wrap">{generatedJobDescription}</p>
                        </div>
                    )}
                </div>

                <div className="mt-6 text-right">
                    <button
                        onClick={onClose}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200 ease-in-out shadow-md hover:shadow-lg"
                    >
                        {translations.close}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetailModal;
