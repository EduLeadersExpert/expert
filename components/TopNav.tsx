import React from 'react';
import { SectionData } from '../types';

interface Props {
  sections: SectionData[];
  onSectionClick: (id: string) => void;
  activeSectionId?: string;
}

export const TopNav: React.FC<Props> = ({ sections, onSectionClick, activeSectionId }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 overflow-x-auto">
        <div className="flex items-center h-16 gap-6 md:gap-8 min-w-max">
          <div 
            className="font-serif font-bold text-purple-900 cursor-pointer flex items-center gap-2"
            onClick={() => onSectionClick('cover')}
          >
            <span className="text-xl">PromptBook</span>
          </div>
          <div className="h-6 w-px bg-purple-200 hidden md:block"></div>
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => onSectionClick(section.id)}
              className={`text-sm font-medium transition-colors px-2 py-1 rounded-md ${
                activeSectionId === section.id 
                  ? 'text-purple-700 bg-purple-50' 
                  : 'text-slate-500 hover:text-purple-600'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};