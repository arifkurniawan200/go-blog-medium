import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Coins, Sparkles } from 'lucide-react';
import type { LocalizedPortfolioContent } from '../../data/i18n';

interface SkillsSectionProps {
  content: LocalizedPortfolioContent;
  collectedSkills: Record<string, boolean>;
  onCollectSkill: (skillId: string, event?: React.MouseEvent<HTMLButtonElement>) => void;
  onCollectAll: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

export function SkillsSection({
  content,
  collectedSkills,
  onCollectSkill,
  onCollectAll
}: SkillsSectionProps) {
  const [activeSkillId, setActiveSkillId] = useState<string>(content.skills[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [justSpunId, setJustSpunId] = useState<string | null>(null);

  // Reset category filter label safely when language switches
  useEffect(() => {
    setSelectedCategory('ALL');
  }, [content.lang]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(content.skills.map((s) => s.category)));
    return unique;
  }, [content.skills]);

  const filteredSkills = useMemo(() => {
    if (selectedCategory === 'ALL') return content.skills;
    return content.skills.filter((s) => s.category === selectedCategory);
  }, [content.skills, selectedCategory]);

  const activeSkill =
    content.skills.find((s) => s.id === activeSkillId) || content.skills[0];
  const collectedCount = Object.values(collectedSkills).filter(Boolean).length;
  const allCollected = collectedCount >= content.skills.length;

  const handleTapCoin = (
    skillId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setActiveSkillId(skillId);
    setJustSpunId(skillId);
    window.setTimeout(() => {
      setJustSpunId((prev) => (prev === skillId ? null : prev));
    }, 680);
    onCollectSkill(skillId, event);
  };

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative py-20 sm:py-28 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Animated Warp Pipe Connector Visual */}
        <motion.div
          whileHover={{ scaleY: 1.12, y: -3 }}
          transition={{ type: 'spring', stiffness: 360, damping: 16 }}
          className="flex justify-center mb-6 cursor-pointer"
          aria-hidden="true"
        >
          <div className="w-20 h-10 pipe-sheen border-[3px] border-mario-ink rounded-t-lg shadow-toon-sm relative">
            <div className="absolute -top-3 -left-2 -right-2 h-5 pipe-sheen border-[3px] border-mario-ink rounded-md" />
          </div>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="toon-panel p-5 sm:p-6 mb-6 flex flex-wrap items-center justify-between gap-4"
        >
          <div>
            <span className="inline-block px-3 py-1 rounded-lg bg-mario-pipe border-2 border-mario-ink font-pixel text-[10px] text-white mb-2">
              {content.ui.skills.worldBadge}
            </span>
            <h2
              id="skills-heading"
              className="font-pixel text-xl sm:text-3xl text-mario-ink leading-snug"
            >
              {content.ui.skills.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 font-semibold mt-1">
              {content.ui.skills.subtitle(collectedCount, content.skills.length)}
            </p>
          </div>

          {!allCollected ? (
            <motion.button
              type="button"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.94 }}
              onClick={onCollectAll}
              className="toon-btn-gold toon-shimmer !text-xs"
            >
              <Coins className="w-4 h-4" />
              <span>{content.ui.skills.collectAll}</span>
            </motion.button>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 360, damping: 18 }}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-mario-coin border-[3px] border-mario-ink font-pixel text-[10px] text-mario-ink shadow-toon-sm"
            >
              <Sparkles className="w-4 h-4 text-mario-red" />
              <span>{content.ui.skills.allCollectedBanner}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Interactive Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6" role="tablist">
          {['ALL', ...categories].map((cat) => {
            const isSelected = selectedCategory === cat;
            const label = cat === 'ALL' ? content.ui.skills.allFilter : cat;
            return (
              <motion.button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isSelected}
                whileHover={{ y: -2, scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-3.5 py-2 rounded-xl border-[2.5px] border-mario-ink font-arcade text-xs font-bold cursor-pointer transition-colors shadow-toon-sm ${
                  isSelected
                    ? 'bg-mario-ink text-mario-coin'
                    : 'bg-white/95 text-mario-ink hover:bg-mario-coin/30'
                }`}
              >
                {label}
              </motion.button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* 10 Collectible Tech Coins Grid with Layout Reordering */}
          <motion.div
            layout
            className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => {
                const isCollected = Boolean(collectedSkills[skill.id]);
                const isFocused = activeSkill.id === skill.id;
                const isFastSpinning = justSpunId === skill.id;

                return (
                  <motion.button
                    key={skill.id}
                    layout
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                    type="button"
                    whileHover={{ y: -8, scale: 1.05 }}
                    whileTap={{ scale: 0.92, y: -2 }}
                    onMouseEnter={() => setActiveSkillId(skill.id)}
                    onFocus={() => setActiveSkillId(skill.id)}
                    onClick={(e) => handleTapCoin(skill.id, e)}
                    className={`toon-panel p-3.5 flex flex-col items-center text-center relative cursor-pointer transition-shadow min-h-[128px] justify-between ${
                      isFocused ? 'ring-4 ring-mario-coin' : ''
                    }`}
                    aria-label={`${skill.name} — ${skill.tooltip}${
                      isCollected ? ` (${content.ui.skills.collectedBadge})` : ''
                    }`}
                  >
                    {/* Collected Check Badge */}
                    <AnimatePresence>
                      {isCollected && (
                        <motion.span
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0 }}
                          transition={{ type: 'spring', stiffness: 450, damping: 18 }}
                          className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-mario-pipe text-white border-[2.5px] border-mario-ink flex items-center justify-center shadow-toon-sm"
                          title={content.ui.skills.collectedBadge}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* 3D Spinning Gold Coin Medallion */}
                    <div
                      className={`w-14 h-14 rounded-full border-[3px] border-mario-ink flex items-center justify-center font-pixel text-xs shadow-toon-sm ${
                        isFastSpinning
                          ? 'animate-coin-spin-fast bg-mario-coin text-mario-ink'
                          : isFocused
                            ? 'animate-coin-spin bg-mario-coin text-mario-ink'
                            : isCollected
                              ? 'bg-mario-coin text-mario-ink'
                              : 'bg-[#FFE14D] text-mario-ink'
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
            </AnimatePresence>
          </motion.div>

          {/* Animated Interactive Tooltip & Inspector Panel */}
          <aside className="lg:col-span-4 toon-panel p-6 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 right-0 h-2.5 border-b-2 border-mario-ink"
              animate={{ backgroundColor: activeSkill.color }}
              transition={{ duration: 0.3 }}
            />

            <div className="mt-1 flex items-center justify-between mb-3">
              <span className="font-pixel text-[9px] px-2.5 py-1 rounded bg-mario-ink text-mario-coin">
                {content.ui.skills.inspectorBadge}
              </span>
              <span className="font-arcade text-xs font-bold text-slate-600">
                {activeSkill.category}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${content.lang}-${activeSkill.id}`}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-12 h-12 rounded-full border-[3px] border-mario-ink bg-mario-coin flex items-center justify-center font-pixel text-xs text-mario-ink shrink-0 animate-coin-spin">
                    {activeSkill.shortCode}
                  </span>
                  <h3 className="font-pixel text-lg text-mario-ink">{activeSkill.name}</h3>
                </div>

                <p className="text-sm sm:text-base text-slate-700 font-semibold leading-relaxed min-h-[56px]">
                  {activeSkill.tooltip}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Coin Vault Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-[11px] font-arcade font-bold text-slate-600 mb-1">
                <span>VAULT</span>
                <span>
                  {collectedCount}/{content.skills.length}
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-200 border-2 border-mario-ink overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-mario-coin via-[#FFB800] to-mario-pipe"
                  animate={{ width: `${(collectedCount / content.skills.length) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 200, damping: 24 }}
                />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t-2 border-dashed border-mario-ink/20 flex items-center justify-between gap-2 text-xs font-bold">
              <span className="text-slate-600">
                {content.ui.skills.statusLabel}{' '}
                <strong
                  className={
                    collectedSkills[activeSkill.id] ? 'text-mario-pipeDark' : 'text-mario-brick'
                  }
                >
                  {collectedSkills[activeSkill.id]
                    ? content.ui.skills.collectedBonus
                    : content.ui.skills.tapToCollect}
                </strong>
              </span>

              {!collectedSkills[activeSkill.id] && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={(e) => handleTapCoin(activeSkill.id, e)}
                  className="toon-btn-gold !px-3 !py-1.5 !min-h-[36px] !text-[11px]"
                >
                  +100
                </motion.button>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
