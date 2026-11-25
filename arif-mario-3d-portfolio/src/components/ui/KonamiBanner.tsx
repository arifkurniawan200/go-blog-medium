import { AnimatePresence, motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface KonamiBannerProps {
  active: boolean;
}

export function KonamiBanner({ active }: KonamiBannerProps) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.85 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 30, opacity: 0, scale: 0.9 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[95] px-5 py-3 rounded-2xl bg-mario-ink text-mario-coin border-4 border-mario-coin shadow-toon-lg flex items-center gap-3 pointer-events-none"
          role="status"
          aria-live="polite"
        >
          <Star className="w-6 h-6 fill-mario-coin text-mario-coin animate-spin" />
          <div>
            <div className="font-pixel text-xs text-mario-coin">★ STAR POWER ACTIVATED! ★</div>
            <div className="font-arcade text-xs text-white mt-0.5">
              Super Speed + Invincible Mode (10s) · +1000 BONUS!
            </div>
          </div>
          <Star className="w-6 h-6 fill-mario-coin text-mario-coin animate-spin" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
