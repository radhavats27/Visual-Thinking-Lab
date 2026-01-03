
import React from 'react';

interface HeaderProps {
  onLogoClick: () => void;
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, onReset }) => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button 
          onClick={onLogoClick}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <i className="fas fa-eye"></i>
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-800">
            Say What You See!
          </span>
        </button>

        <div className="flex items-center gap-4">
          <button 
            onClick={onReset}
            className="text-gray-400 hover:text-red-500 text-sm flex items-center gap-1 transition-colors"
            title="Reset Game"
          >
            <i className="fas fa-redo-alt"></i>
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
