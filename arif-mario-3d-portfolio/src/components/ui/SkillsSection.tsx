import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Coins } from 'lucide-react';
import { SKILLS, type SkillCoin } from '../../data/portfolio';

interface SkillsSectionProps {
  collectedSkills: Record<string, boolean>;
  onCollectSkill: (skillId: string) => void;
  onCollectAll: () => void;
}

export function SkillsSection({
  collectedSkills,
  onCollectSkill,
  onCollectAll
}: SkillsSectionProps) {
  const [activeSkill, setActiveSkill] = useState<SkillCoin>(SKILLS[0]);
  const collectedCount = Object.values(collectedSkills).filter(Boolean).length;

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative py-20 sm:py-28 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Warp Pipe Connector Visual */}
        <div className="flex justify-center mb-6" aria-hidden="true">
          <div className="w-20 h-10 pipe-sheen border-[3px] border-mario-ink rounded-t-lg shadow-toon-sm relative">
            <div className="absolute -top-3 -left-2 -right-2 h-5 pipe-sheen border-[3px] border-mario-ink rounded-md" />
          </div>
        </div>

        {/* Section Header */}
        <div className="toon-panel p-5 sm:p-6 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-lg bg-mario-pipe border-2 border-mario-ink font-pixel text-[10px] text-white mb-2">
              WORLD 1-2 · COIN VAULT
            </span>
            <h2
              id="skills-heading"
              className="font-pixel text-xl sm:text-3xl text-mario-ink leading-snug"
            >
              Skills &amp; Tech Stack
            </h2>
            <p className="text-sm sm:text-base text-slate-700 font-semibold mt-1">
              Hover or tap each collectible coin to inspect &amp; collect ({collectedCount}/{SKILLS.length} collected)
            </p>
          </div>

          {collectedCount < SKILLS.length && (
            <button type="button" onClick={onCollectAll} className="toon-btn-gold !text-xs">
              <Coins className="w-4 h-4" />
              <span>Collect All Coins</span>
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* 10 Collectible Tech Coins Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
            {SKILLS.map((skill) => {
              const isCollected = Boolean(collectedSkills[skill.id]);
              const isFocused = activeSkill.id === skill.id;

              return (
                <motion.button
                  key={skill.id}
                  type="button"
                  whileHover={{ y: -6, scale: 1.04 }}
                  whileTap={{ scale: 0.94 }}
                  onMouseEnter={() => setActiveSkill(skill)}
                  onFocus={() => setActiveSkill(skill)}
                  onClick={() => {
                    setActiveSkill(skill);
                    onCollectSkill(skill.id);
                  }}
                  className={`toon-panel p-3.5 flex flex-col items-center text-center relative cursor-pointer transition-all min-h-[126px] justify-between ${
                    isFocused ? 'ring-4 ring-mario-coin' : ''
                  }`}
                  aria-label={`${skill.name} — ${skill.tooltip}${isCollected ? ' (Collected)' : ''}`}
                >
                  {/* Collected Check Badge */}
                  {isCollected && (
                    <span
                      className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-mario-pipe text-white border-[2.5px] border-mario-ink flex items-center justify-center shadow-toon-sm"
                      title="Collected"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  )}

                  {/* Spinning Gold Coin Medallion */}
                  <div
                    className={`w-14 h-14 rounded-full border-[3px] border-mario-ink flex items-center justify-center font-pixel text-xs shadow-toon-sm ${
                      isCollected ? 'bg-mario-coin text-mario-ink' : 'bg-[#FFE14D] text-mario-ink'
                    }`}
                  >
                    {skill.shortCode}
                  </div>

                  <div className="mt-2.5">
                    <div className="font-arcade text-xs sm:text-sm font-bold text-mario-ink">
                      {skill.name}
                    </div>
                    <div className="text-[11px] font-bold text-slate-500">{skill.category}</div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Interactive Tooltip & Inspector Panel */}
          <aside className="lg:col-span-4 toon-panel p-6 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-2.5 border-b-2 border-mario-ink"
              style={{ backgroundColor: activeSkill.color }}
            />
            <div className="mt-1 flex items-center justify-between mb-3">
              <span className="font-pixel text-[9px] px-2.5 py-1 rounded bg-mario-ink text-mario-coin">
                COIN INSPECTOR
              </span>
              <span className="font-arcade text-xs font-bold text-slate-600">
                {activeSkill.category}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <span
                className="w-12 h-12 rounded-full border-[3px] border-mario-ink bg-mario-coin flex items-center justify-center font-pixel text-xs text-mario-ink shrink-0"
              >
                {activeSkill.shortCode}
              </span>
              <h3 className="font-pixel text-lg text-mario-ink">{activeSkill.name}</h3>
            </div>

            <p className="text-sm sm:text-base text-slate-700 font-semibold leading-relaxed">
              {activeSkill.tooltip}
            </p>

            <div className="mt-5 pt-4 border-t-2 border-dashed border-mario-ink/20 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-600">
                Status:{' '}
                <strong className={collectedSkills[activeSkill.id] ? 'text-mario-pipeDark' : 'text-mario-brick'}>
                  {collectedSkills[activeSkill.id] ? 'Collected (+100)' : 'Tap coin to collect'}
                </strong>
              </span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
