import { AnimatePresence, motion } from 'framer-motion';

export interface ParticleBurst {
  id: number;
  x: number;
  y: number;
  label?: string;
  variant?: 'coin' | 'star' | 'fireworks';
}

interface ParticleOverlayProps {
  bursts: ParticleBurst[];
  disabled?: boolean;
}

const SPARK_COLORS = ['#FBD000', '#E52521', '#00A800', '#5C94FC', '#FFFFFF', '#FF7A00'];

export function ParticleOverlay({ bursts, disabled = false }: ParticleOverlayProps) {
  if (disabled) return null;

  return (
    <div
      className="fixed inset-0 z-[85] pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      <AnimatePresence>
        {bursts.map((burst) => {
          const sparkCount = burst.variant === 'fireworks' ? 16 : 8;
          const radius = burst.variant === 'fireworks' ? 115 : 58;

          return (
            <div
              key={burst.id}
              className="fixed"
              style={{ left: burst.x, top: burst.y }}
            >
              {/* Floating Arcade Score / Label */}
              {burst.label && (
                <motion.div
                  initial={{ y: 0, x: '-50%', opacity: 1, scale: 0.7 }}
                  animate={{ y: -72, x: '-50%', opacity: 0, scale: 1.18 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute whitespace-nowrap font-pixel text-[11px] sm:text-xs text-mario-coin pixel-text-shadow-sm bg-mario-ink/90 border-2 border-mario-coin px-2.5 py-1 rounded-lg shadow-toon-sm"
                >
                  {burst.label}
                </motion.div>
              )}

              {/* Radial Mario Stars & Confetti Sparks */}
              {Array.from({ length: sparkCount }).map((_, idx) => {
                const angle = (Math.PI * 2 * idx) / sparkCount;
                const dist = radius * (0.7 + ((idx * 37) % 10) / 22);
                const tx = Math.cos(angle) * dist;
                const ty = Math.sin(angle) * dist - (burst.variant === 'coin' ? 24 : 10);
                const color = SPARK_COLORS[(burst.id + idx) % SPARK_COLORS.length];
                const isStar = idx % 2 === 0;

                return (
                  <motion.span
                    key={idx}
                    initial={{ x: 0, y: 0, scale: 0.5, opacity: 1, rotate: 0 }}
                    animate={{
                      x: tx,
                      y: ty,
                      scale: [0.9, 1.25, 0.2],
                      opacity: [1, 1, 0],
                      rotate: isStar ? 220 : -180
                    }}
                    transition={{
                      duration: burst.variant === 'fireworks' ? 0.9 : 0.65,
                      ease: 'easeOut'
                    }}
                    className="absolute block"
                    style={{
                      color,
                      marginLeft: -6,
                      marginTop: -6
                    }}
                  >
                    {isStar ? (
                      <span className="font-pixel text-xs pixel-text-shadow-sm">★</span>
                    ) : (
                      <span
                        className="block w-3 h-3 rounded-full border-2 border-mario-ink"
                        style={{ backgroundColor: color }}
                      />
                    )}
                  </motion.span>
                );
              })}
            </div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
