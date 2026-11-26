import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LocalizedPortfolioContent } from '../../data/i18n';

interface LoadingScreenProps {
  content: LocalizedPortfolioContent;
  onComplete: () => void;
  onSkipToContent: () => void;
}

export function LoadingScreen({ content, onComplete, onSkipToContent }: LoadingScreenProps) {
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
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] bg-mario-sky flex flex-col items-center justify-center px-6 text-center overflow-hidden"
          role="status"
          aria-live="polite"
          aria-label={content.ui.loadingAria}
        >
          {/* Floating Retro Decorative Stars */}
          <motion.span
            animate={{ y: [0, -14, 0], rotate: [0, 20, -20, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            className="absolute top-[22%] left-[18%] font-pixel text-xl text-mario-coin pixel-text-shadow-sm opacity-90"
            aria-hidden="true"
          >
            ★
          </motion.span>
          <motion.span
            animate={{ y: [0, 12, 0], rotate: [0, -25, 25, 0] }}
            transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
            className="absolute top-[28%] right-[18%] font-pixel text-2xl text-white pixel-text-shadow-sm opacity-85"
            aria-hidden="true"
          >
            ★
          </motion.span>

          {/* Red Cap AK Emblem */}
          <motion.div
            animate={{ y: [0, -14, 0], scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1.0, ease: 'easeInOut' }}
            className="w-24 h-24 rounded-full bg-mario-red border-4 border-mario-ink shadow-toon flex items-center justify-center mb-6"
          >
            <span className="w-14 h-14 rounded-full bg-white border-[3px] border-mario-ink flex items-center justify-center font-pixel text-lg text-mario-red">
              {content.profile.initials}
            </span>
          </motion.div>

          <p className="font-pixel text-xs sm:text-sm text-mario-coin pixel-text-shadow-sm tracking-widest mb-2">
            {content.ui.loadingBadge}
          </p>
          <h1 className="font-pixel text-lg sm:text-2xl text-white pixel-text-shadow mb-6">
            {content.profile.name.toUpperCase()}
          </h1>

          {/* Retro Progress Bar */}
          <div className="w-full max-w-xs h-7 bg-mario-ink p-1 rounded-xl border-[3px] border-white shadow-toon-sm overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-mario-coin via-[#FFE866] to-mario-pipe rounded-md"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            />
          </div>
          <p className="font-arcade text-xs text-white pixel-text-shadow-sm mt-2">
            {progress}% {content.ui.loadingReady}
          </p>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setVisible(false);
              onSkipToContent();
            }}
            className="mt-7 toon-btn-white !text-xs"
          >
            {content.ui.skipIntro}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
