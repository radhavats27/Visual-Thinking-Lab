
import React from 'react';
import { GameProgress } from '../types';
import { LEVELS } from '../constants';

interface LevelSelectorProps {
  progress: GameProgress;
  onSelect: (levelId: number) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ progress, onSelect }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Challenge</h2>
        <p className="text-gray-500">Unlock each level by completing the previous one.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LEVELS.map((level) => {
          const isUnlocked = level.id <= progress.unlockedLevel;
          const isCompleted = progress.completedLevels.includes(level.id);
          const score = progress.scores[level.id];

          return (
            <div 
              key={level.id}
              className={`relative rounded-3xl p-6 border-2 transition-all duration-300 ${
                isUnlocked 
                  ? 'bg-white border-white shadow-md cursor-pointer card-hover hover:border-indigo-100' 
                  : 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed'
              }`}
              onClick={() => isUnlocked && onSelect(level.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  level.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  level.difficulty === 'Medium' ? 'bg-blue-100 text-blue-700' :
                  level.difficulty === 'Medium-Hard' ? 'bg-yellow-100 text-yellow-700' :
                  level.difficulty === 'Hard' ? 'bg-orange-100 text-orange-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {level.difficulty}
                </span>
                {isCompleted && (
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                    <i className="fas fa-check"></i>
                  </div>
                )}
              </div>

              <div className="mb-2">
                <span className="text-indigo-500 font-bold text-sm uppercase tracking-wider">Level {level.id}</span>
                <h3 className="text-xl font-bold text-gray-900">{level.title}</h3>
              </div>
              
              <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                {level.category} • {level.focus}
              </p>

              {isCompleted && score !== undefined && (
                <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-xs text-gray-400 font-medium">Best Match:</span>
                  <span className="text-lg font-bold text-indigo-600">{score}%</span>
                </div>
              )}

              {!isUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50/20 backdrop-blur-[1px] rounded-3xl">
                  <i className="fas fa-lock text-gray-300 text-3xl"></i>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LevelSelector;
