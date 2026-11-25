import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Cloud, Compass, Sparkles } from 'lucide-react';
import { SERVICES } from '../../data/portfolio';

interface ServicesSectionProps {
  hitServices: Record<string, boolean>;
  onHitService: (serviceId: string) => void;
  onHitAll: () => void;
}

const POWERUP_ICONS = {
  mushroom: Server,
  cloud: Cloud,
  star: Compass
};

export function ServicesSection({
  hitServices,
  onHitService,
  onHitAll
}: ServicesSectionProps) {
  const [coinBursts, setCoinBursts] = useState<Record<string, number>>({});

  const allRevealed = SERVICES.every((s) => hitServices[s.id]);

  const handleBlockClick = (serviceId: string) => {
    setCoinBursts((prev) => ({ ...prev, [serviceId]: (prev[serviceId] || 0) + 1 }));
    onHitService(serviceId);
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative py-20 sm:py-28 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Level Header */}
        <div className="toon-panel p-5 sm:p-6 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-lg bg-mario-coin border-2 border-mario-ink font-pixel text-[10px] text-mario-ink mb-2">
              WORLD 1-1 · POWER-UP BLOCKS
            </span>
            <h2
              id="services-heading"
              className="font-pixel text-xl sm:text-3xl text-mario-ink leading-snug"
            >
              Services
            </h2>
            <p className="text-sm sm:text-base text-slate-700 font-semibold mt-1">
              Hit the <strong>?</strong> blocks to unleash each backend power-up!
            </p>
          </div>

          {!allRevealed && (
            <button type="button" onClick={onHitAll} className="toon-btn-gold !text-xs">
              <Sparkles className="w-4 h-4" />
              <span>Unlock All 3 Blocks</span>
            </button>
          )}
        </div>

        {/* 3 Interactive Question Blocks & Pop-Out Service Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => {
            const revealed = Boolean(hitServices[service.id]);
            const Icon = POWERUP_ICONS[service.powerUpType];
            const burstKey = coinBursts[service.id] || 0;

            return (
              <div key={service.id} className="flex flex-col items-center">
                {/* Interactive "?" Block Button */}
                <div className="relative mb-4">
                  {/* Floating Coin Particle Burst */}
                  <AnimatePresence>
                    {burstKey > 0 && (
                      <motion.div
                        key={burstKey}
                        initial={{ y: 0, opacity: 1, scale: 0.7 }}
                        animate={{ y: -64, opacity: 0, scale: 1.25 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="absolute left-1/2 -translate-x-1/2 -top-4 pointer-events-none flex items-center gap-1 font-pixel text-xs text-mario-coin pixel-text-shadow-sm z-20"
                        aria-hidden="true"
                      >
                        <span>+100</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="button"
                    whileTap={{ y: -14, scale: 1.08 }}
                    onClick={() => handleBlockClick(service.id)}
                    aria-expanded={revealed}
                    aria-controls={`service-card-${service.id}`}
                    className={`w-24 h-24 rounded-2xl border-4 border-mario-ink shadow-toon flex flex-col items-center justify-center relative cursor-pointer transition-colors ${
                      revealed
                        ? 'bg-mario-brick text-mario-coin'
                        : 'bg-mario-coin text-white hover:bg-[#FFE03D]'
                    }`}
                  >
                    {/* Corner Rivets */}
                    <span className="absolute top-2 left-2 w-2 h-2 rounded-full bg-mario-ink" />
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-mario-ink" />
                    <span className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-mario-ink" />
                    <span className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-mario-ink" />

                    <span className="font-pixel text-3xl pixel-text-shadow">
                      {revealed ? '★' : '?'}
                    </span>
                    <span className="font-arcade text-[10px] font-bold mt-1 text-mario-ink bg-white/90 px-2 py-0.5 rounded border border-mario-ink">
                      {revealed ? 'HIT!' : `HIT #${idx + 1}`}
                    </span>
                  </motion.button>
                </div>

                {/* Power-Up Service Card (Pop-out animation + always accessible in DOM for SEO/SR) */}
                <motion.article
                  id={`service-card-${service.id}`}
                  initial={false}
                  animate={
                    revealed
                      ? { scale: 1, y: 0, opacity: 1 }
                      : { scale: 0.96, y: 6, opacity: 0.92 }
                  }
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  className={`w-full flex-1 toon-panel p-6 flex flex-col justify-between relative overflow-hidden ${
                    revealed ? 'ring-4 ring-mario-coin' : ''
                  }`}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-2.5 border-b-2 border-mario-ink"
                    style={{ backgroundColor: service.accent }}
                  />

                  <div>
                    <div className="flex items-center justify-between gap-2 mt-1 mb-3">
                      <span
                        className="w-11 h-11 rounded-xl border-[3px] border-mario-ink flex items-center justify-center text-white shadow-toon-sm"
                        style={{ backgroundColor: service.accent }}
                      >
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="font-pixel text-[9px] px-2.5 py-1 rounded-lg bg-slate-100 border-2 border-mario-ink text-mario-ink">
                        {service.powerUpName}
                      </span>
                    </div>

                    <h3 className="font-arcade text-lg font-bold text-mario-ink mb-2">
                      {service.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-700 font-semibold leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t-2 border-dashed border-mario-ink/20 flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-mario-sky/15 border-2 border-mario-ink/25 font-arcade text-[11px] font-bold text-mario-ink"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
