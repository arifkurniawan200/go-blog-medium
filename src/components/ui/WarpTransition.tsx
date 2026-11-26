import { AnimatePresence, motion } from 'framer-motion';

interface WarpTransitionProps {
  activeLabel: string | null;
  transitLabel: string;
}

export function WarpTransition({ activeLabel, transitLabel }: WarpTransitionProps) {
  return (
    <AnimatePresence>
      {activeLabel && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center pipe-sheen border-y-[6px] border-mario-ink pointer-events-none"
          aria-hidden="true"
        >
          <motion.div
            initial={{ scale: 0.78, rotate: -3 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 360, damping: 22 }}
            className="bg-mario-ink text-mario-coin border-4 border-white rounded-2xl px-6 py-4 shadow-toon-lg text-center"
          >
            <div className="font-pixel text-[10px] text-white tracking-widest mb-1.5">
              {transitLabel}
            </div>
            <div className="font-pixel text-sm sm:text-lg text-mario-coin">{activeLabel}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
