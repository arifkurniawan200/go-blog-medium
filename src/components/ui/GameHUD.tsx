import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Menu,
  X,
  Volume2,
  VolumeX,
  Monitor,
  Sparkles,
  ExternalLink,
  Globe
} from 'lucide-react';
import type { Language, LocalizedPortfolioContent } from '../../data/i18n';

interface GameHUDProps {
  content: LocalizedPortfolioContent;
  language: Language;
  score: number;
  coinsCount: number;
  activeWorld: string;
  activeSectionId: string;
  scrollProgress: number;
  soundEnabled: boolean;
  classicMode: boolean;
  starPower: boolean;
  onChangeLanguage: (lang: Language, event?: React.MouseEvent<HTMLButtonElement>) => void;
  onToggleSound: () => void;
  onToggleClassicMode: () => void;
  onNavigate: (sectionId: string) => void;
}

export function GameHUD({
  content,
  language,
  score,
  coinsCount,
  activeWorld,
  activeSectionId,
  scrollProgress,
  soundEnabled,
  classicMode,
  starPower,
  onChangeLanguage,
  onToggleSound,
  onToggleClassicMode,
  onNavigate
}: GameHUDProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const formattedScore = String(Math.min(999999, Math.floor(score))).padStart(6, '0');
  const formattedCoins = String(coinsCount).padStart(2, '0');
  const totalSkills = content.skills.length;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-3 sm:px-5 pt-2.5 pb-2 pointer-events-none ${
        starPower ? 'star-power-active' : ''
      }`}
    >
      {/* Skip link for keyboard & screen-reader accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] toon-btn-gold"
      >
        {content.ui.skipToContent}
      </a>

      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        {/* TOP ARCADE HUD BAR */}
        <div className="pointer-events-auto relative overflow-hidden flex items-center justify-between gap-2 bg-mario-ink/95 text-white border-[3px] border-white rounded-2xl px-3 sm:px-5 py-2 shadow-toon backdrop-blur-md">
          {/* Top-Left: ARIF x 05 & SCORE */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2.5 sm:gap-4 text-left min-h-[44px] pr-1 group cursor-pointer"
            aria-label={content.ui.backToTitle}
          >
            <div className="flex items-center gap-1.5">
              <motion.span
                whileHover={{ rotate: [0, -12, 12, 0] }}
                transition={{ duration: 0.4 }}
                className="w-8 h-8 rounded-full bg-mario-red border-2 border-white flex items-center justify-center font-pixel text-[10px] text-white shrink-0"
              >
                {content.profile.initials}
              </motion.span>
              <div className="leading-tight">
                <div className="font-pixel text-[10px] sm:text-xs text-white">
                  {content.profile.hudName}{' '}
                  <span className="text-mario-coin">x {content.profile.lives}</span>
                </div>
                <motion.div
                  key={Math.floor(score / 25)}
                  initial={{ scale: 1.08, color: '#FBD000' }}
                  animate={{ scale: 1, color: '#CBD5E1' }}
                  transition={{ duration: 0.25 }}
                  className="font-pixel text-[9px] sm:text-[10px] mt-0.5 origin-left"
                >
                  {content.ui.scoreLabel} {formattedScore}
                </motion.div>
              </div>
            </div>
          </motion.button>

          {/* Top-Center: Animated Active WORLD indicator */}
          <div className="hidden md:flex flex-col items-center leading-tight min-w-[205px]">
            <span className="font-pixel text-[9px] text-mario-coin tracking-widest">
              {content.ui.stageLabel}
            </span>
            <div className="h-5 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeWorld}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="font-pixel text-xs text-white mt-0.5 whitespace-nowrap"
                >
                  {activeWorld}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Top-Right: Language Switcher + Coin Counter + Classic 2D + Sound + Mobile Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Animated Language Toggle (ID / EN) */}
            <div
              role="group"
              aria-label={content.ui.switchLanguageAria}
              className="flex items-center p-1 rounded-xl bg-white/10 border-2 border-white/40 min-h-[44px]"
            >
              <Globe className="hidden xl:block w-3.5 h-3.5 text-mario-coin ml-1.5 mr-1 shrink-0" aria-hidden="true" />
              {(['id', 'en'] as const).map((code) => {
                const isActive = language === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={(e) => onChangeLanguage(code, e)}
                    aria-pressed={isActive}
                    className={`relative px-2 sm:px-2.5 py-1.5 rounded-lg font-pixel text-[9px] sm:text-[10px] cursor-pointer transition-colors ${
                      isActive ? 'text-mario-ink' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="hud-lang-pill"
                        transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                        className="absolute inset-0 rounded-lg bg-mario-coin border border-mario-ink shadow-sm"
                      />
                    )}
                    <span className="relative z-10">{code.toUpperCase()}</span>
                  </button>
                );
              })}
            </div>

            {/* Animated Coin Counter */}
            <motion.div
              key={coinsCount}
              initial={{ scale: coinsCount > 0 ? 1.2 : 1 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 420, damping: 18 }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/10 border-2 border-mario-coin/70 font-pixel text-[10px] sm:text-xs"
              aria-label={`${coinsCount}/${totalSkills}`}
              title={content.ui.coinsTitle}
            >
              <span
                className="inline-flex w-4 h-4 rounded-full bg-mario-coin border-2 border-mario-ink text-mario-ink text-[8px] items-center justify-center font-bold animate-coin-spin"
                aria-hidden="true"
              >
                $
              </span>
              <span className="text-mario-coin">
                x {formattedCoins}
                <span className="hidden sm:inline text-white/60">/{totalSkills}</span>
              </span>
            </motion.div>

            {/* Classic 2D / 3D Mode Toggle */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              onClick={onToggleClassicMode}
              className={`hidden sm:flex min-h-[44px] min-w-[44px] px-2.5 rounded-xl border-2 font-arcade text-[10px] sm:text-xs font-bold items-center gap-1.5 transition-colors cursor-pointer ${
                classicMode
                  ? 'bg-mario-coin text-mario-ink border-white'
                  : 'bg-white/10 text-white border-white/40 hover:bg-white/20'
              }`}
              aria-pressed={classicMode}
              title={classicMode ? content.ui.switchTo3DTitle : content.ui.switchToClassicTitle}
            >
              {classicMode ? <Sparkles className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
              <span className="hidden lg:inline">
                {classicMode ? content.ui.mode3D : content.ui.modeClassic}
              </span>
            </motion.button>

            {/* Sound Mute Toggle */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={onToggleSound}
              className={`min-h-[44px] min-w-[44px] px-2.5 rounded-xl border-2 flex items-center justify-center gap-1.5 font-arcade text-xs transition-colors cursor-pointer ${
                soundEnabled
                  ? 'bg-mario-pipe text-white border-white'
                  : 'bg-white/10 text-slate-300 border-white/40 hover:bg-white/20'
              }`}
              aria-pressed={soundEnabled}
              aria-label={soundEnabled ? content.ui.muteSoundAria : content.ui.enableSoundAria}
              title={soundEnabled ? content.ui.soundOnTitle : content.ui.soundOffTitle}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </motion.button>

            {/* Mobile Game Menu Button */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden min-h-[44px] min-w-[44px] rounded-xl bg-mario-red border-2 border-white flex items-center justify-center text-white cursor-pointer"
              aria-expanded={menuOpen}
              aria-label={content.ui.toggleMenuAria}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>

          {/* Live Scroll Progress Strip along Bottom of HUD */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10" aria-hidden="true">
            <motion.div
              className="h-full bg-gradient-to-r from-mario-pipe via-mario-coin to-mario-red"
              animate={{ width: `${Math.max(2, scrollProgress * 100)}%` }}
              transition={{ duration: 0.12, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* DESKTOP GAME MENU BAR (ARCADE LEVEL SELECT) */}
        <nav
          aria-label="World Navigation"
          className="hidden md:flex pointer-events-auto items-center justify-between gap-2 bg-white/95 border-[3px] border-mario-ink rounded-2xl px-3 py-1.5 shadow-toon-sm"
        >
          <div className="flex items-center gap-1">
            {content.nav.map((item) =>
              item.external ? (
                <motion.a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="min-h-[44px] px-3.5 rounded-xl font-arcade text-xs font-bold text-mario-ink hover:bg-mario-sky/15 hover:text-mario-skyDark flex items-center gap-1.5 transition-colors"
                >
                  <span>{item.label}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </motion.a>
              ) : (
                <motion.button
                  key={item.id}
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onNavigate(item.id)}
                  className="relative min-h-[44px] px-3.5 rounded-xl font-arcade text-xs font-bold text-mario-ink flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {activeSectionId === item.id && (
                    <motion.span
                      layoutId="active-nav-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      className="absolute inset-0 rounded-xl bg-mario-coin/55 border-2 border-mario-ink"
                    />
                  )}
                  <span
                    className={`relative z-10 w-2 h-2 rounded-full transition-colors ${
                      activeSectionId === item.id ? 'bg-mario-red' : 'bg-mario-pipe'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="relative z-10">{item.label}</span>
                </motion.button>
              )
            )}
          </div>

          <div className="flex items-center gap-2">
            {starPower && (
              <motion.span
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: [1, 1.08, 1], opacity: 1 }}
                transition={{ repeat: Infinity, duration: 0.9 }}
                className="px-3 py-1 rounded-full bg-mario-coin border-2 border-mario-ink font-pixel text-[9px] text-mario-ink"
              >
                {content.ui.starPowerShort}
              </motion.span>
            )}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('contact')}
              className="toon-btn-red toon-shimmer !py-2 !px-4 !text-xs"
            >
              {content.ui.hireMe}
            </motion.button>
          </div>
        </nav>

        {/* ANIMATED MOBILE DROPDOWN GAME MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 360, damping: 26 }}
              aria-label="Mobile World Navigation"
              className="md:hidden pointer-events-auto toon-panel p-3 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between px-2 pb-1.5 border-b-2 border-dashed border-mario-ink/20">
                <span className="font-pixel text-[10px] text-mario-skyDark">{activeWorld}</span>
                <span className="font-arcade text-[10px] text-mario-ink/70">
                  {content.ui.selectStage}
                </span>
              </div>

              {content.nav.map((item) =>
                item.external ? (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="min-h-[44px] px-3 rounded-xl font-arcade text-sm font-bold text-mario-ink hover:bg-mario-coin/30 flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onNavigate(item.id);
                    }}
                    className={`min-h-[44px] px-3 rounded-xl font-arcade text-sm font-bold text-mario-ink hover:bg-mario-coin/30 flex items-center justify-between text-left ${
                      activeSectionId === item.id ? 'bg-mario-coin/35 border-2 border-mario-ink' : ''
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-pixel text-[9px] text-mario-pipe">
                      {content.ui.warpArrow}
                    </span>
                  </button>
                )
              )}

              {/* Mobile Classic 2D / 3D Switch */}
              <button
                type="button"
                onClick={() => {
                  onToggleClassicMode();
                  setMenuOpen(false);
                }}
                className="sm:hidden min-h-[44px] px-3 rounded-xl bg-slate-100 border-2 border-mario-ink/30 font-arcade text-xs font-bold text-mario-ink flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  {classicMode ? <Sparkles className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                  {classicMode ? content.ui.mode3D : content.ui.modeClassic}
                </span>
                <span className="font-pixel text-[8px] text-slate-500">TOGGLE</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onNavigate('contact');
                }}
                className="toon-btn-red w-full mt-1"
              >
                {content.ui.hireMe}
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
