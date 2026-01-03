
import React, { useState, useEffect, useRef } from 'react';
import { Level } from '../types';
import { geminiService } from '../services/geminiService';

interface GameplayProps {
  level: Level;
  onComplete: (score: number) => void;
  onBack: () => void;
}

const Gameplay: React.FC<GameplayProps> = ({ level, onComplete, onBack }) => {
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [userPrompt, setUserPrompt] = useState('');
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const initRef = useRef(false);

  useEffect(() => {
    const initLevel = async () => {
      if (initRef.current) return;
      initRef.current = true;
      setIsInitializing(true);
      try {
        const img = await geminiService.generateImage(level.masterPrompt);
        setReferenceImage(img);
      } catch (err) {
        setError("Failed to load level content. Please try again.");
      } finally {
        setIsInitializing(false);
      }
    };
    initLevel();
  }, [level.masterPrompt]);

  const handleGenerate = async () => {
    if (!userPrompt.trim()) return;
    setIsGenerating(true);
    setError(null);
    try {
      const img = await geminiService.generateImage(userPrompt);
      setUserImage(img);
      const score = await geminiService.calculateMatchPercentage(userPrompt, level.masterPrompt);
      setMatchScore(score);
    } catch (err) {
      setError("Oops! AI hit a snag. Try a different prompt.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="animate-spin text-indigo-600 mb-6">
          <i className="fas fa-circle-notch text-6xl"></i>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Preparing Level {level.id}...</h2>
        <p className="text-gray-500">Creating a unique masterpiece for you to describe.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="text-gray-500 hover:text-indigo-600 font-medium flex items-center gap-2 transition-colors"
        >
          <i className="fas fa-chevron-left"></i>
          Back to Levels
        </button>
        <div className="text-center">
          <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Level {level.id}</span>
          <h2 className="text-2xl font-bold text-gray-900">{level.title}</h2>
        </div>
        <div className="w-24"></div> {/* Spacer */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Reference Image */}
        <div className="lg:col-span-5">
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Reference Image</h3>
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden relative">
              {referenceImage ? (
                <img src={referenceImage} alt="Reference" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <i className="fas fa-image text-gray-200 text-5xl"></i>
                </div>
              )}
            </div>
            <div className="mt-4 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-50">
               <h4 className="text-xs font-bold text-indigo-600 uppercase mb-2">Goal</h4>
               <p className="text-sm text-indigo-900 font-medium leading-snug">{level.learningGoal}</p>
            </div>
          </div>
        </div>

        {/* Center: Status Icon */}
        <div className="lg:col-span-2 hidden lg:flex flex-col items-center justify-center h-full">
           <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${
             matchScore !== null ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-300'
           }`}>
             <i className={`fas ${matchScore !== null ? 'fa-check' : 'fa-equals'} text-2xl`}></i>
           </div>
           <div className="w-px h-full bg-gradient-to-b from-transparent via-gray-100 to-transparent my-4"></div>
        </div>

        {/* Right: User Image & Score */}
        <div className="lg:col-span-5">
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 h-full flex flex-col">
            <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Your Recreation</h3>
            
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden relative flex-grow">
              {userImage ? (
                <img src={userImage} alt="User result" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-300 p-8 text-center">
                  <i className="fas fa-magic text-5xl mb-4"></i>
                  <p className="text-sm">Your generated image will appear here after you write a prompt.</p>
                </div>
              )}
              {isGenerating && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
                   <div className="animate-spin text-indigo-600 mb-4">
                     <i className="fas fa-palette text-4xl"></i>
                   </div>
                   <p className="text-indigo-900 font-bold">AI is painting your vision...</p>
                   <p className="text-xs text-gray-500 mt-2">Almost there!</p>
                </div>
              )}
            </div>

            {matchScore !== null && (
              <div className="mt-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-gray-600">Match Accuracy</span>
                  <span className="text-2xl font-black text-indigo-600">{matchScore}%</span>
                </div>
                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${matchScore}%` }}
                  />
                </div>
                {matchScore >= 70 && (
                  <button 
                    onClick={() => onComplete(matchScore)}
                    className="mt-6 w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl transition-colors shadow-lg shadow-green-100"
                  >
                    Finish Level
                    <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                )}
                {matchScore < 70 && (
                   <p className="mt-4 text-xs text-center text-amber-600 font-medium">
                     <i className="fas fa-info-circle mr-1"></i>
                     Try to get at least 70% match to progress!
                   </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="mt-10 max-w-4xl mx-auto">
        <div className="bg-white p-6 md:p-8 rounded-[40px] shadow-xl border border-gray-100">
          <div className="flex flex-col md:flex-row gap-6 items-start">
             <div className="flex-grow w-full">
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Your Prompt</label>
                <textarea 
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  placeholder="Describe what you see in the reference image..."
                  className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-3xl transition-all resize-none outline-none h-24 text-gray-800"
                  disabled={isGenerating}
                />
                <div className="mt-4 flex flex-wrap gap-2">
                   {level.tips.map((tip, i) => (
                     <div key={i} className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full text-indigo-700 text-xs font-semibold">
                       <i className="fas fa-lightbulb"></i>
                       {tip}
                     </div>
                   ))}
                </div>
             </div>
             
             <button
               onClick={handleGenerate}
               disabled={isGenerating || !userPrompt.trim()}
               className={`md:self-center px-10 py-5 rounded-3xl font-black text-white transition-all shadow-lg flex items-center gap-3 whitespace-nowrap ${
                 isGenerating || !userPrompt.trim() 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-105 active:scale-95'
               }`}
             >
               {isGenerating ? (
                 <>
                   <i className="fas fa-circle-notch animate-spin"></i>
                   Processing...
                 </>
               ) : (
                 <>
                   Generate
                   <i className="fas fa-wand-magic-sparkles"></i>
                 </>
               )}
             </button>
          </div>
          {error && (
            <div className="mt-4 text-center text-red-500 text-sm font-medium">
              <i className="fas fa-exclamation-triangle mr-1"></i>
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gameplay;
