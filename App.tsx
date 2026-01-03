
import React, { useState, useEffect, useCallback } from 'react';
import { GameState, GameProgress } from './types';
import { LEVELS, STORAGE_KEY } from './constants';
import Landing from './components/Landing';
import LevelSelector from './components/LevelSelector';
import Gameplay from './components/Gameplay';
import Reflection from './components/Reflection';
import Header from './components/Header';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.LANDING);
  const [currentLevelId, setCurrentLevelId] = useState<number | null>(null);
  const [progress, setProgress] = useState<GameProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return {
      unlockedLevel: 1,
      completedLevels: [],
      scores: {}
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const handleStartGame = () => {
    setGameState(GameState.LEVEL_SELECTOR);
  };

  const handleSelectLevel = (levelId: number) => {
    setCurrentLevelId(levelId);
    setGameState(GameState.GAMEPLAY);
  };

  const handleLevelComplete = (levelId: number, score: number) => {
    setProgress(prev => {
      const isLastLevel = levelId === LEVELS.length;
      const nextUnlocked = isLastLevel ? prev.unlockedLevel : Math.max(prev.unlockedLevel, levelId + 1);
      
      return {
        ...prev,
        unlockedLevel: nextUnlocked,
        completedLevels: Array.from(new Set([...prev.completedLevels, levelId])),
        scores: { ...prev.scores, [levelId]: score }
      };
    });

    if (levelId === LEVELS.length) {
      setGameState(GameState.REFLECTION);
    } else {
      setGameState(GameState.LEVEL_SELECTOR);
    }
  };

  const handleReset = () => {
    const defaultProgress = { unlockedLevel: 1, completedLevels: [], scores: {} };
    setProgress(defaultProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProgress));
    setGameState(GameState.LANDING);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onLogoClick={() => setGameState(GameState.LANDING)} 
        onReset={handleReset}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {gameState === GameState.LANDING && (
          <Landing onStart={handleStartGame} />
        )}
        
        {gameState === GameState.LEVEL_SELECTOR && (
          <LevelSelector 
            progress={progress} 
            onSelect={handleSelectLevel} 
          />
        )}
        
        {gameState === GameState.GAMEPLAY && currentLevelId !== null && (
          <Gameplay 
            level={LEVELS.find(l => l.id === currentLevelId)!} 
            onComplete={(score) => handleLevelComplete(currentLevelId, score)}
            onBack={() => setGameState(GameState.LEVEL_SELECTOR)}
          />
        )}
        
        {gameState === GameState.REFLECTION && (
          <Reflection 
            progress={progress} 
            onRestart={handleReset} 
          />
        )}
      </main>

      <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-100">
        &copy; {new Date().getFullYear()} Say What You See! • Powered by Gemini AI
      </footer>
    </div>
  );
};

export default App;
