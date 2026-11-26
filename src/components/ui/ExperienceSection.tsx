import { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Flag, Castle, CheckCircle2 } from 'lucide-react';
import type { LocalizedPortfolioContent } from '../../data/i18n';

interface ExperienceSectionProps {
  content: LocalizedPortfolioContent;
  onWaveFlag: (levelId: string, event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function ExperienceSection({ content, onWaveFlag }: ExperienceSectionProps) {
  const pathRef = useRef<HTMLDivElement>(null);
  const [wavedLevels, setWavedLevels] = useState<Record<string, number>>({});

  const { scrollYProgress } = useScroll({
    target: pathRef,
    offset: ['start 75%', 'end 65%']
  });
  const smoothScaleY = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 26,
    restDelta: 0.001
  });

  const handleFlagClick = (
    levelId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setWavedLevels((prev) => ({ ...prev, [levelId]: (prev[levelId] || 0) + 1 }));
    onWaveFlag(levelId, event);
  };

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative py-20 sm:py-28 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="toon-panel p-5 sm:p-6 mb-10 flex flex-wrap items-center justify-between gap-4"
        >
          <div>
            <span className="inline-block px-3 py-1 rounded-lg bg-mario-red border-2 border-mario-ink font-pixel text-[10px] text-white mb-2">
              {content.ui.experience.worldBadge}
            </span>
            <h2
              id="experience-heading"
              className="font-pixel text-xl sm:text-3xl text-mario-ink leading-snug"
            >
              {content.ui.experience.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 font-semibold mt-1">
              {content.ui.experience.subtitle}
            </p>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-mario-coin/30 border-2 border-mario-ink font-arcade text-xs font-bold text-mario-ink">
            {content.ui.experience.pathBadge}
          </div>
        </motion.div>

        {/* 4 Chronological Levels connected by an Animated Mario World Path */}
        <div ref={pathRef} className="relative space-y-8">
          {/* Background Path Track */}
          <div
            className="hidden md:block absolute left-8 top-8 bottom-8 w-2.5 rounded-full bg-white/70 border-2 border-mario-ink overflow-hidden"
            aria-hidden="true"
          >
            {/* Scroll-driven Animated Gold Fill */}
            <motion.div
              className="w-full h-full origin-top bg-gradient-to-b from-mario-pipe via-mario-coin to-mario-red"
              style={{ scaleY: smoothScaleY }}
            />
          </div>

          {content.experienceLevels.map((level, index) => {
            const waveCount = wavedLevels[level.id] || 0;

            return (
              <motion.article
                key={level.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="relative md:pl-20"
              >
                {/* Animated Stage Node Badge on Spine */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 18 }}
                  className="hidden md:flex absolute left-2 top-6 w-14 h-14 rounded-2xl border-[3px] border-mario-ink shadow-toon-sm items-center justify-center font-pixel text-xs text-white z-10"
                  style={{ backgroundColor: level.badgeColor }}
                  aria-hidden="true"
                >
                  {level.isFinalCastle ? <Castle className="w-6 h-6" /> : `1-${index + 1}`}
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                  className={`toon-panel p-6 sm:p-7 relative overflow-hidden ${
                    level.isFinalCastle ? 'ring-4 ring-mario-red/40' : ''
                  }`}
                >
                  {/* Top Level Accent Bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-2.5 border-b-2 border-mario-ink"
                    style={{ backgroundColor: level.badgeColor }}
                  />

                  {/* Level Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 pt-1 pb-4 border-b-2 border-dashed border-mario-ink/20">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border-2 border-mario-ink font-pixel text-[10px] text-white"
                          style={{ backgroundColor: level.badgeColor }}
                        >
                          {level.isFinalCastle && <Castle className="w-3.5 h-3.5" />}
                          {level.levelCode}
                        </span>
                        <span className="px-3 py-1 rounded-lg bg-slate-100 border-2 border-mario-ink/30 font-arcade text-xs font-bold text-slate-700">
                          {level.period}
                        </span>
                      </div>

                      <h3 className="font-arcade text-xl sm:text-2xl font-bold text-mario-ink">
                        {level.role}{' '}
                        <span style={{ color: level.badgeColor }}>· {level.company}</span>
                      </h3>
                    </div>

                    {/* Finish Flagpole Cleared Badge */}
                    <motion.div
                      whileHover={{ scale: 1.06 }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#DCFCE7] border-2 border-mario-ink font-arcade text-xs font-bold text-[#14532D] shrink-0"
                    >
                      <Flag
                        key={`badge-flag-${waveCount}`}
                        className={`w-4 h-4 text-mario-red fill-mario-red ${
                          waveCount > 0 ? 'animate-flag-wave' : ''
                        }`}
                      />
                      <span>
                        {level.isFinalCastle
                          ? content.ui.experience.activeStage
                          : content.ui.experience.stageClear}
                      </span>
                    </motion.div>
                  </div>

                  {/* Staggered Experience Bullet Points */}
                  <ul className="mt-4 space-y-2.5 text-sm sm:text-base text-slate-800 font-semibold leading-relaxed">
                    {level.highlights.map((bullet, bIdx) => (
                      <motion.li
                        key={bullet}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.3, delay: bIdx * 0.05 }}
                        className="flex items-start gap-2.5"
                      >
                        <CheckCircle2
                          className="w-5 h-5 shrink-0 mt-0.5"
                          style={{ color: level.badgeColor }}
                          aria-hidden="true"
                        />
                        <span>{bullet}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Interactive Level Finish Flag Footer */}
                  <div className="mt-5 pt-3 border-t-2 border-mario-ink/10 flex flex-wrap items-center justify-between gap-2 text-xs font-arcade font-bold text-slate-500">
                    <span>
                      {level.isFinalCastle
                        ? content.ui.experience.finalCastleFooter
                        : content.ui.experience.nextLevelFooter}
                    </span>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={(e) => handleFlagClick(level.id, e)}
                      title={content.ui.experience.waveFlagHint}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-mario-ink cursor-pointer transition-colors ${
                        waveCount > 0
                          ? 'bg-mario-coin text-mario-ink shadow-toon-sm'
                          : 'bg-slate-100 text-mario-ink hover:bg-mario-coin/45'
                      }`}
                    >
                      <Flag
                        key={`btn-flag-${waveCount}`}
                        className={`w-3.5 h-3.5 ${
                          waveCount > 0
                            ? 'text-mario-red fill-mario-red animate-flag-wave'
                            : 'text-mario-pipe'
                        }`}
                      />
                      <span>
                        {waveCount > 0
                          ? content.ui.experience.flagWaved
                          : content.ui.experience.goalPole}
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
