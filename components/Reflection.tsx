
import React from 'react';
import { GameProgress } from '../types';
import { LEVELS } from '../constants';

interface ReflectionProps {
  progress: GameProgress;
  onRestart: () => void;
}

const Reflection: React.FC<ReflectionProps> = ({ progress, onRestart }) => {
  // Fix: Cast Object.values to number[] to resolve 'unknown' type error in reduce
  const scoresArray = Object.values(progress.scores) as number[];
  const averageScore = LEVELS.length > 0 
    ? Math.round(scoresArray.reduce((a, b) => a + b, 0) / LEVELS.length)
    : 0;

  return (
    <div className="max-w-4xl mx-auto text-center py-12 px-4">
      <div className="mb-8 inline-block p-6 bg-yellow-50 rounded-full text-yellow-500">
        <i className="fas fa-trophy text-6xl"></i>
      </div>

      <h2 className="text-4xl font-extrabold text-gray-900 mb-4">You're a Prompt Master!</h2>
      <p className="text-xl text-gray-600 mb-12">
        You've completed all levels. Your observation skills have leveled up!
      </p>

      <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 overflow-hidden mb-12">
        <div className="bg-indigo-600 p-8 text-white">
          <div className="text-sm uppercase font-bold tracking-widest opacity-80 mb-2">Final Accuracy Score</div>
          <div className="text-6xl font-black">{averageScore}%</div>
        </div>
        
        <div className="p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Your Journey Recap</h3>
          <div className="space-y-4">
            {LEVELS.map(level => (
              <div key={level.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-xs">
                    {level.id}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-800 text-sm">{level.title}</div>
                    <div className="text-xs text-gray-500">{level.category}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-indigo-600">{progress.scores[level.id] || 0}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 p-8 rounded-[40px] mb-12 text-left">
        <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
          <i className="fas fa-comment-dots"></i>
          Teacher's Note
        </h3>
        <p className="text-indigo-800 leading-relaxed">
          Through this experiment, students have explored how specific vocabulary impacts AI image generation. 
          By starting with basic objects and ending with complex cinematic scenes, they've learned that 
          the key to a great prompt isn't just length, but <strong>precision</strong> and <strong>intent</strong>.
        </p>
      </div>

      <button
        onClick={onRestart}
        className="px-10 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-black transition-all hover:scale-105"
      >
        <i className="fas fa-redo-alt mr-2"></i>
        Play Again
      </button>
    </div>
  );
};

export default Reflection;
