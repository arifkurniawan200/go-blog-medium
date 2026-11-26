import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Cloud, Compass, Sparkles } from 'lucide-react';
import type { LocalizedPortfolioContent } from '../../data/i18n';

interface ServicesSectionProps {
  content: LocalizedPortfolioContent;
  hitServices: Record<string, boolean>;
  onHitService: (serviceId: string, event?: React.MouseEvent<HTMLButtonElement>) => void;
  onHitAll: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

const POWERUP_ICONS = {
  mushroom: Server,
  cloud: Cloud,
  star: Compass
};

export function ServicesSection({
  content,
  hitServices,
  onHitService,
  onHitAll
}: ServicesSectionProps) {
  const [coinBursts, setCoinBursts] = useState<Record<string, number>>({});

  const allRevealed = content.services.every((s) => hitServices[s.id]);

  const handleBlockClick = (
    serviceId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setCoinBursts((prev) => ({ ...prev, [serviceId]: (prev[serviceId] || 0) + 1 }));
    onHitService(serviceId, event);
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative py-20 sm:py-28 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Level Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="toon-panel p-5 sm:p-6 mb-8 flex flex-wrap items-center justify-between gap-4"
        >
          <div>
            <span className="inline-block px-3 py-1 rounded-lg bg-mario-coin border-2 border-mario-ink font-pixel text-[10px] text-mario-ink mb-2">
              {content.ui.services.worldBadge}
            </span>
            <h2
              id="services-heading"
              className="font-pixel text-xl sm:text-3xl text-mario-ink leading-snug"
            >
              {content.ui.services.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 font-semibold mt-1">
              {content.ui.services.subtitlePrefix} <strong>?</strong>{' '}
              {content.ui.services.subtitleSuffix}
            </p>
          </div>

          {!allRevealed ? (
            <motion.button
              type="button"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.94 }}
              onClick={onHitAll}
              className="toon-btn-gold toon-shimmer !text-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>{content.ui.services.unlockAll}</span>
            </motion.button>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 380, damping: 20 }}
              className="px-3.5 py-2 rounded-xl bg-[#DCFCE7] border-2 border-mario-ink font-pixel text-[10px] text-[#14532D] shadow-toon-sm"
            >
              {content.ui.services.allUnlockedBadge}
            </motion.div>
          )}
        </motion.div>

        {/* 3 Interactive Question Blocks & Pop-Out Service Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {content.services.map((service, idx) => {
            const revealed = Boolean(hitServices[service.id]);
            const Icon = POWERUP_ICONS[service.powerUpType];
            const burstKey = coinBursts[service.id] || 0;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: idx * 0.08, duration: 0.45 }}
                className="flex flex-col items-center"
              >
                {/* Interactive "?" Block Button */}
                <div className="relative mb-4">
                  {/* Floating Coin + Star Particle Burst */}
                  <AnimatePresence>
                    {burstKey > 0 && (
                      <motion.div
                        key={burstKey}
                        initial={{ y: 0, opacity: 1, scale: 0.65 }}
                        animate={{ y: -68, opacity: 0, scale: 1.3 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.65, ease: 'easeOut' }}
                        className="absolute left-1/2 -translate-x-1/2 -top-4 pointer-events-none flex items-center gap-1 font-pixel text-xs text-mario-coin pixel-text-shadow-sm z-20"
                        aria-hidden="true"
                      >
                        <span className="inline-flex w-5 h-5 rounded-full bg-mario-coin border-2 border-mario-ink text-mario-ink text-[9px] items-center justify-center">
                          $
                        </span>
                        <span>+100</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="button"
                    key={`block-${service.id}-${burstKey}`}
                    animate={
                      burstKey > 0
                        ? { y: [0, -22, 4, 0], scale: [1, 1.12, 0.96, 1] }
                        : undefined
                    }
                    transition={{ duration: 0.36, ease: 'easeOut' }}
                    whileHover={{ scale: 1.07, y: -4 }}
                    whileTap={{ y: -16, scale: 1.1 }}
                    onClick={(e) => handleBlockClick(service.id, e)}
                    aria-expanded={revealed}
                    aria-controls={`service-card-${service.id}`}
                    className={`w-24 h-24 rounded-2xl border-4 border-mario-ink shadow-toon flex flex-col items-center justify-center relative cursor-pointer transition-colors ${
                      revealed
                        ? 'bg-mario-brick text-mario-coin'
                        : 'bg-mario-coin text-white hover:bg-[#FFE03D] animate-block-bob toon-shimmer'
                    }`}
                    style={!revealed ? { animationDelay: `${idx * 0.35}s` } : undefined}
                  >
                    {/* Corner Rivets */}
                    <span className="absolute top-2 left-2 w-2 h-2 rounded-full bg-mario-ink" />
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-mario-ink" />
                    <span className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-mario-ink" />
                    <span className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-mario-ink" />

                    <motion.span
                      key={revealed ? 'star' : 'q'}
                      initial={{ scale: 0.5, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                      className="font-pixel text-3xl pixel-text-shadow"
                    >
                      {revealed ? '★' : '?'}
                    </motion.span>
                    <span className="font-arcade text-[10px] font-bold mt-1 text-mario-ink bg-white/90 px-2 py-0.5 rounded border border-mario-ink">
                      {revealed
                        ? content.ui.services.hitDone
                        : `${content.ui.services.hitPrefix}${idx + 1}`}
                    </span>
                  </motion.button>
                </div>

                {/* Power-Up Service Card */}
                <motion.article
                  id={`service-card-${service.id}`}
                  initial={false}
                  animate={
                    revealed
                      ? { scale: 1, y: 0, opacity: 1 }
                      : { scale: 0.96, y: 6, opacity: 0.92 }
                  }
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  className={`w-full flex-1 toon-panel p-6 flex flex-col justify-between relative overflow-hidden group ${
                    revealed ? 'ring-4 ring-mario-coin' : ''
                  }`}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-2.5 border-b-2 border-mario-ink"
                    style={{ backgroundColor: service.accent }}
                  />

                  <div>
                    <div className="flex items-center justify-between gap-2 mt-1 mb-3">
                      <motion.span
                        animate={revealed ? { rotate: [0, -12, 12, 0], scale: [1, 1.15, 1] } : undefined}
                        transition={{ duration: 0.45 }}
                        className="w-11 h-11 rounded-xl border-[3px] border-mario-ink flex items-center justify-center text-white shadow-toon-sm group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: service.accent }}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.span>
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
                      <motion.span
                        key={tag}
                        whileHover={{ scale: 1.08, y: -2 }}
                        className="px-2.5 py-1 rounded-lg bg-mario-sky/15 border-2 border-mario-ink/25 font-arcade text-[11px] font-bold text-mario-ink"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
