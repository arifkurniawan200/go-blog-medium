import { motion } from 'framer-motion';
import { Flag, Castle, CheckCircle2 } from 'lucide-react';
import { EXPERIENCE_LEVELS } from '../../data/portfolio';

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative py-20 sm:py-28 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="toon-panel p-5 sm:p-6 mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-lg bg-mario-red border-2 border-mario-ink font-pixel text-[10px] text-white mb-2">
              WORLD 1-3 · CAREER CAMPAIGN
            </span>
            <h2
              id="experience-heading"
              className="font-pixel text-xl sm:text-3xl text-mario-ink leading-snug"
            >
              Work Experience
            </h2>
            <p className="text-sm sm:text-base text-slate-700 font-semibold mt-1">
              4 Levels cleared from Level 1-1 to the Final Castle!
            </p>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-mario-coin/30 border-2 border-mario-ink font-arcade text-xs font-bold text-mario-ink">
            LEVEL 1-1 → LEVEL 1-4 (FINAL)
          </div>
        </div>

        {/* 4 Chronological Levels connected by a Mario World path */}
        <div className="relative space-y-8">
          {/* Vertical Dotted Path Spine (Desktop/Mobile) */}
          <div
            className="hidden md:block absolute left-8 top-8 bottom-8 w-2 rounded-full bg-mario-coin border-2 border-mario-ink"
            aria-hidden="true"
          />

          {EXPERIENCE_LEVELS.map((level, index) => (
            <motion.article
              key={level.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="relative md:pl-20"
            >
              {/* Stage Node Badge on Spine */}
              <div
                className="hidden md:flex absolute left-2 top-6 w-14 h-14 rounded-2xl border-[3px] border-mario-ink shadow-toon-sm items-center justify-center font-pixel text-xs text-white z-10"
                style={{ backgroundColor: level.badgeColor }}
                aria-hidden="true"
              >
                {level.isFinalCastle ? <Castle className="w-6 h-6" /> : `1-${index + 1}`}
              </div>

              <div
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
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#DCFCE7] border-2 border-mario-ink font-arcade text-xs font-bold text-[#14532D] shrink-0">
                    <Flag className="w-4 h-4 text-mario-red fill-mario-red" />
                    <span>{level.isFinalCastle ? 'ACTIVE STAGE' : 'STAGE CLEAR'}</span>
                  </div>
                </div>

                {/* Exact Experience Bullet Points */}
                <ul className="mt-4 space-y-2.5 text-sm sm:text-base text-slate-800 font-semibold leading-relaxed">
                  {level.highlights.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="w-5 h-5 shrink-0 mt-0.5"
                        style={{ color: level.badgeColor }}
                        aria-hidden="true"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Level Finish Flag Footer */}
                <div className="mt-5 pt-3 border-t-2 border-mario-ink/10 flex items-center justify-between text-xs font-arcade font-bold text-slate-500">
                  <span>{level.isFinalCastle ? 'FINAL CASTLE · CURRENT QUEST' : 'WARP PIPE TO NEXT LEVEL ↓'}</span>
                  <span className="inline-flex items-center gap-1 text-mario-ink">
                    <Flag className="w-3.5 h-3.5 text-mario-pipe" />
                    GOAL POLE
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
