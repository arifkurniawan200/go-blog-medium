import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, Sparkles, ChevronUp } from 'lucide-react';
import type { LocalizedPortfolioContent } from '../../data/i18n';

interface FloatingControlsProps {
  content: LocalizedPortfolioContent;
  scrollProgress: number;
  activeSectionId: string;
  classicMode: boolean;
  onJump: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onCelebrate: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onNavigate: (sectionId: string) => void;
}

export function FloatingControls({
  content,
  scrollProgress,
  activeSectionId,
  classicMode,
  onJump,
  onCelebrate,
  onNavigate
}: FloatingControlsProps) {
  const showBackToTop = scrollProgress > 0.16;

  return (
    <div className="fixed bottom-4 right-3 sm:right-5 z-40 flex flex-col items-end gap-2.5 pointer-events-none">
      {/* Compact Interactive World Map Mini-Progress Pill (Desktop & Tablet) */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="hidden sm:flex pointer-events-auto flex-col gap-1.5 bg-mario-ink/95 text-white border-[3px] border-white rounded-2xl px-3.5 py-2.5 shadow-toon backdrop-blur-md"
        aria-label={content.ui.controls.worldProgress}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="font-pixel text-[8px] text-mario-coin tracking-widest">
            {content.ui.controls.worldProgress}
          </span>
          <span className="font-pixel text-[8px] text-slate-300">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>

        {/* Track with clickable World Nodes + AK progress runner */}
        <div className="relative flex items-center gap-3 pt-1 pb-0.5">
          <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-white/20 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-mario-pipe via-mario-coin to-mario-red rounded-full"
              animate={{ width: `${Math.max(4, scrollProgress * 100)}%` }}
              transition={{ type: 'spring', stiffness: 180, damping: 24 }}
            />
          </div>

          {content.worldSections.map((sec) => {
            const isActive = activeSectionId === sec.id;
            return (
              <motion.button
                key={sec.id}
                type="button"
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onNavigate(sec.id)}
                title={sec.worldLabel}
                aria-label={sec.worldLabel}
                className={`relative z-10 w-6 h-6 rounded-full border-2 border-mario-ink font-pixel text-[7px] flex items-center justify-center cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-mario-coin text-mario-ink ring-2 ring-white'
                    : 'bg-slate-700 text-white hover:bg-mario-pipe'
                }`}
              >
                {sec.shortLabel}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Interactive Arcade Action Buttons */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Back-to-Top Warp Pipe Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              type="button"
              initial={{ scale: 0, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0, y: 16, opacity: 0 }}
              whileHover={{ y: -3, scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 360, damping: 22 }}
              onClick={() => onNavigate('hero')}
              aria-label={content.ui.backToTitle}
              title={content.ui.backToTitle}
              className="toon-btn-green !px-3 !py-2.5 !text-[11px]"
            >
              <ChevronUp className="w-4 h-4 stroke-[3]" />
              <span className="hidden sm:inline">{content.ui.controls.backToTop}</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Fireworks / Celebrate Button */}
        <motion.button
          type="button"
          whileHover={{ y: -3, scale: 1.06 }}
          whileTap={{ scale: 0.9, rotate: -6 }}
          onClick={onCelebrate}
          aria-label={content.ui.controls.celebrateAria}
          title={content.ui.controls.celebrateAria}
          className="toon-btn-gold !px-3.5 !py-2.5 !text-[11px]"
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline">{content.ui.controls.celebrate}</span>
        </motion.button>

        {/* 3D Character JUMP Action Button */}
        {!classicMode && (
          <motion.button
            type="button"
            whileHover={{ y: -4, scale: 1.08 }}
            whileTap={{ y: -12, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 420, damping: 18 }}
            onClick={onJump}
            aria-label={content.ui.controls.jumpAria}
            title={content.ui.controls.jumpAria}
            className="toon-btn-red !px-3.5 !py-2.5 !text-[11px]"
          >
            <ArrowUp className="w-4 h-4 stroke-[3]" />
            <span>{content.ui.controls.jump}</span>
          </motion.button>
        )}
      </div>
    </div>
  );
}
