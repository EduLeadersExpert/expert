import React from 'react';
import { BookPage as IBookPage, PageType } from '../types';
import { Copy, Sparkles, BookOpen, GraduationCap, Microscope, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  page: IBookPage;
  isActive: boolean;
  isFlipping: boolean;
}

export const BookPage: React.FC<Props> = ({ page, isActive, isFlipping }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (page.data?.content) {
      navigator.clipboard.writeText(page.data.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getSectionIcon = (id: string) => {
    switch (id) {
      case 'self-dev': return <Sparkles className="w-8 h-8 text-purple-600" />;
      case 'work-tasks': return <BookOpen className="w-8 h-8 text-indigo-600" />;
      case 'science': return <Microscope className="w-8 h-8 text-blue-600" />;
      case 'lms': return <Settings className="w-8 h-8 text-slate-600" />;
      default: return <GraduationCap className="w-8 h-8 text-purple-600" />;
    }
  };

  // Render Cover
  if (page.type === PageType.COVER) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-purple-100 to-white flex flex-col items-center justify-center p-8 text-center border-r border-purple-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -mr-16 -mt-16 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -ml-16 -mb-16 animate-pulse"></div>
        
        <div className="z-10 bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-purple-100 max-w-sm">
          <div className="mb-6 flex justify-center">
             <div className="p-4 bg-purple-100 rounded-full">
               <GraduationCap className="w-16 h-16 text-purple-600" />
             </div>
          </div>
          <h1 className="font-serif text-3xl font-bold text-slate-800 mb-4 tracking-tight">
            Промпты для преподавателей
          </h1>
          <p className="text-purple-800 font-medium mb-8">
            36 готовых сценариев для работы с ИИ
          </p>
          <div className="text-sm text-slate-500 font-sans">
            <p>• Саморазвитие</p>
            <p>• Рабочие задачи</p>
            <p>• Научная деятельность</p>
            <p>• Настройки LMS</p>
          </div>
        </div>
        <div className="absolute bottom-6 text-purple-400 text-xs font-mono">
          Virtual Edition
        </div>
      </div>
    );
  }

  // Render Prompt Page
  if (page.type === PageType.PROMPT && page.data) {
    return (
      <div className="w-full h-full bg-white flex flex-col p-8 md:p-12 relative">
        {/* Paper texture overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
        
        {/* Header */}
        <div className="relative z-10 border-b-2 border-purple-100 pb-4 mb-6">
          <div className="flex items-center gap-3 text-purple-600 mb-2 text-sm font-medium uppercase tracking-wider">
             {getSectionIcon(page.sectionId || '')}
             <span>{page.sectionId === 'self-dev' ? 'Саморазвитие' : 
                    page.sectionId === 'work-tasks' ? 'Рабочие задачи' :
                    page.sectionId === 'science' ? 'Наука' : 'LMS'}</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-slate-800 leading-tight">
            {page.data.title}
          </h2>
          {page.data.role && (
             <div className="mt-2 text-sm text-slate-500 italic flex items-center gap-1">
               <span className="font-semibold text-purple-500">Роль:</span> {page.data.role}
             </div>
          )}
        </div>

        {/* Content Body */}
        <div className="relative z-10 flex-1 overflow-y-auto prompt-scroll pr-2">
          <div className="font-sans text-slate-700 whitespace-pre-wrap leading-relaxed text-sm md:text-base">
            {page.data.content}
          </div>
        </div>

        {/* Footer / Copy Button */}
        <div className="relative z-10 pt-6 mt-4 border-t border-purple-50 flex justify-between items-center">
          <span className="text-xs text-slate-400 font-mono">Стр. {page.pageNumber}</span>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-sm font-medium transition-colors"
          >
            {copied ? (
              <>
                <Sparkles className="w-4 h-4" />
                Скопировано!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Копировать промпт
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // Default fallback
  return <div />;
};