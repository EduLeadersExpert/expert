import React, { useState, useEffect, useMemo } from 'react';
import { BOOK_CONTENT } from './data';
import { BookPage, PageType } from './types';
import { BookPage as BookPageComponent } from './components/BookPage';
import { TopNav } from './components/TopNav';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  // Flatten content into pages
  const pages: BookPage[] = useMemo(() => {
    const allPages: BookPage[] = [];
    let pageCounter = 0;

    // Cover Page
    allPages.push({
      type: PageType.COVER,
      pageNumber: pageCounter++
    });

    // Content Pages
    BOOK_CONTENT.forEach(section => {
      section.prompts.forEach((prompt, index) => {
        allPages.push({
          type: PageType.PROMPT,
          sectionId: section.id,
          promptIndex: index,
          data: prompt,
          pageNumber: pageCounter++
        });
      });
    });

    return allPages;
  }, []);

  const currentPage = pages[currentPageIndex];
  const activeSectionId = currentPage.sectionId;

  const navigateToSection = (sectionId: string) => {
    if (sectionId === 'cover') {
      changePage(0);
      return;
    }
    const index = pages.findIndex(p => p.sectionId === sectionId);
    if (index !== -1) {
      changePage(index);
    }
  };

  const changePage = (newIndex: number) => {
    const diff = newIndex - currentPageIndex;
    setDirection(diff > 0 ? 1 : -1);
    setCurrentPageIndex(newIndex);
  };

  const nextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      changePage(currentPageIndex + 1);
    }
  };

  const prevPage = () => {
    if (currentPageIndex > 0) {
      changePage(currentPageIndex - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPageIndex]);

  // Page Flip Animation Variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      rotateY: direction > 0 ? 45 : -45,
      opacity: 0,
      scale: 0.9,
      zIndex: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      rotateY: direction < 0 ? 45 : -45,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    })
  };

  return (
    <div className="min-h-screen bg-lavender-50 flex flex-col font-sans overflow-hidden">
      <TopNav 
        sections={BOOK_CONTENT} 
        onSectionClick={navigateToSection}
        activeSectionId={activeSectionId}
      />

      <main className="flex-1 flex flex-col items-center justify-center p-4 pt-20 relative">
        
        {/* Book Container */}
        <div className="relative w-full max-w-4xl aspect-[3/4] md:aspect-[4/3] max-h-[85vh] perspective-1000">
          
          <AnimatePresence initial={false} custom={direction} mode='wait'>
            <motion.div
              key={currentPageIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 bg-white rounded-r-xl rounded-l-md shadow-book overflow-hidden flex"
            >
               {/* Left Spine Gradient (Visual trick) */}
               <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-200/50 to-transparent z-20 pointer-events-none"></div>
               
               {/* Page Content */}
               <div className="w-full h-full">
                  <BookPageComponent 
                    page={currentPage} 
                    isActive={true} 
                    isFlipping={false} 
                  />
               </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls - Floating for desktop, fixed bottom for mobile */}
          <div className="absolute -bottom-16 left-0 right-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:-left-20 md:-right-20 flex justify-between items-center pointer-events-none px-4 md:px-0 z-50">
            <button 
              onClick={prevPage}
              disabled={currentPageIndex === 0}
              className={`p-3 rounded-full bg-white shadow-lg text-purple-700 pointer-events-auto transition-all hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${currentPageIndex === 0 ? 'invisible' : ''}`}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button 
              onClick={nextPage}
              disabled={currentPageIndex === pages.length - 1}
              className={`p-3 rounded-full bg-white shadow-lg text-purple-700 pointer-events-auto transition-all hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${currentPageIndex === pages.length - 1 ? 'invisible' : ''}`}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>

        </div>

        {/* Progress bar */}
        <div className="mt-8 text-sm font-medium text-purple-400">
           {Math.round(((currentPageIndex) / (pages.length - 1)) * 100)}% Прочитано
        </div>
      </main>
    </div>
  );
};

export default App;