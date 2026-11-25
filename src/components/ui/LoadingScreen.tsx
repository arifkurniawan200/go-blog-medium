import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFILE } from '../../data/portfolio';

interface LoadingScreenProps {
  onComplete: () => void;
  onSkipToContent: () => void;
}

export function LoadingScreen({ onComplete, onSkipToContent }: LoadingScreenProps) {
  const [progress, setProgress] = useState(14);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, prev + Math.floor(Math.random() * 24 + 16));
        if (next >= 100) {
          window.clearInterval(timer);
          window.setTimeout(() => {
            setVisible(false);
            onComplete();
          }, 260);
        }
        return next;
      });
    }, 150);

    return () => window.clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] bg-mario-sky flex flex-col items-center justify-center px-6 text-center"
          role="status"
          aria-live="polite"
          aria-label="Loading Arif Kurniawan 3D World Portfolio"
        >
          {/* Red Cap AK Emblem */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
            className="w-24 h-24 rounded-full bg-mario-red border-4 border-mario-ink shadow-toon flex items-center justify-center mb-6"
          >
            <span className="w-14 h-14 rounded-full bg-white border-[3px] border-mario-ink flex items-center justify-center font-pixel text-lg text-mario-red">
              {PROFILE.initials}
            </span>
          </motion.div>

          <p className="font-pixel text-xs sm:text-sm text-mario-coin pixel-text-shadow-sm tracking-widest mb-2">
            WORLD 1-1 LOADING
          </p>
          <h1 className="font-pixel text-lg sm:text-2xl text-white pixel-text-shadow mb-6">
            {PROFILE.name.toUpperCase()}
          </h1>

          {/* Retro Progress Bar */}
          <div className="w-full max-w-xs h-7 bg-mario-ink p-1 rounded-xl border-[3px] border-white shadow-toon-sm overflow-hidden">
            <div
              className="h-full bg-mario-coin rounded-md transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="font-arcade text-xs text-white pixel-text-shadow-sm mt-2">
            {progress}% READY
          </p>

          <button
            type="button"
            onClick={() => {
              setVisible(false);
              onSkipToContent();
            }}
            className="mt-7 toon-btn-white !text-xs"
          >
            Skip Intro →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
