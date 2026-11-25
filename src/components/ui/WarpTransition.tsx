import { AnimatePresence, motion } from 'framer-motion';

interface WarpTransitionProps {
  activeLabel: string | null;
}

export function WarpTransition({ activeLabel }: WarpTransitionProps) {
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
          <div className="bg-mario-ink text-mario-coin border-4 border-white rounded-2xl px-6 py-4 shadow-toon-lg text-center">
            <div className="font-pixel text-[10px] text-white tracking-widest mb-1.5">
              WARP PIPE TRANSIT
            </div>
            <div className="font-pixel text-sm sm:text-lg text-mario-coin">{activeLabel}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
