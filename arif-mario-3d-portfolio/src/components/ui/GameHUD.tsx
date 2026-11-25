import { useState } from 'react';
import { Menu, X, Volume2, VolumeX, Monitor, Sparkles, ExternalLink } from 'lucide-react';
import { NAV_ITEMS, PROFILE, SKILLS } from '../../data/portfolio';

interface GameHUDProps {
  score: number;
  coinsCount: number;
  activeWorld: string;
  soundEnabled: boolean;
  classicMode: boolean;
  starPower: boolean;
  onToggleSound: () => void;
  onToggleClassicMode: () => void;
  onNavigate: (sectionId: string) => void;
}

export function GameHUD({
  score,
  coinsCount,
  activeWorld,
  soundEnabled,
  classicMode,
  starPower,
  onToggleSound,
  onToggleClassicMode,
  onNavigate
}: GameHUDProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const formattedScore = String(Math.min(999999, Math.floor(score))).padStart(6, '0');
  const formattedCoins = String(coinsCount).padStart(2, '0');

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
        Skip to Content
      </a>

      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        {/* TOP ARCADE HUD BAR */}
        <div className="pointer-events-auto flex items-center justify-between gap-2 bg-mario-ink/95 text-white border-[3px] border-white rounded-2xl px-3 sm:px-5 py-2 shadow-toon backdrop-blur-md">
          {/* Top-Left: ARIF x 05 & SCORE */}
          <button
            type="button"
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2.5 sm:gap-4 text-left min-h-[44px] pr-1 group cursor-pointer"
            aria-label="Back to Title Screen"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-8 h-8 rounded-full bg-mario-red border-2 border-white flex items-center justify-center font-pixel text-[10px] text-white shrink-0 group-hover:scale-110 transition-transform">
                {PROFILE.initials}
              </span>
              <div className="leading-tight">
                <div className="font-pixel text-[10px] sm:text-xs text-white">
                  {PROFILE.hudName} <span className="text-mario-coin">x {PROFILE.lives}</span>
                </div>
                <div className="font-pixel text-[9px] sm:text-[10px] text-slate-300 mt-0.5">
                  SCORE {formattedScore}
                </div>
              </div>
            </div>
          </button>

          {/* Top-Center: Active WORLD indicator */}
          <div className="hidden md:flex flex-col items-center leading-tight">
            <span className="font-pixel text-[9px] text-mario-coin tracking-widest">STAGE</span>
            <span className="font-pixel text-xs text-white mt-0.5">{activeWorld}</span>
          </div>

          {/* Top-Right: Coin Counter + Sound + Classic 2D + Mobile Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Coin Counter */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/10 border-2 border-mario-coin/70 font-pixel text-[10px] sm:text-xs"
              aria-label={`Collected ${coinsCount} of ${SKILLS.length} tech stack coins`}
              title="Collect Tech Stack coins to increase your score!"
            >
              <span
                className="inline-flex w-4 h-4 rounded-full bg-mario-coin border-2 border-mario-ink text-mario-ink text-[8px] items-center justify-center font-bold"
                aria-hidden="true"
              >
                $
              </span>
              <span className="text-mario-coin">
                x {formattedCoins}
                <span className="hidden sm:inline text-white/60">/{SKILLS.length}</span>
              </span>
            </div>

            {/* Classic 2D / 3D Mode Toggle */}
            <button
              type="button"
              onClick={onToggleClassicMode}
              className={`min-h-[44px] min-w-[44px] px-2.5 rounded-xl border-2 font-arcade text-[10px] sm:text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                classicMode
                  ? 'bg-mario-coin text-mario-ink border-white'
                  : 'bg-white/10 text-white border-white/40 hover:bg-white/20'
              }`}
              aria-pressed={classicMode}
              title={classicMode ? 'Switch to 3D WebGL World' : 'Switch to lightweight 2D Classic Mode'}
            >
              {classicMode ? <Sparkles className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
              <span className="hidden lg:inline">{classicMode ? '3D Mode' : 'Classic 2D'}</span>
            </button>

            {/* Sound Mute Toggle (Default OFF) */}
            <button
              type="button"
              onClick={onToggleSound}
              className={`min-h-[44px] min-w-[44px] px-2.5 rounded-xl border-2 flex items-center justify-center gap-1.5 font-arcade text-xs transition-colors cursor-pointer ${
                soundEnabled
                  ? 'bg-mario-pipe text-white border-white'
                  : 'bg-white/10 text-slate-300 border-white/40 hover:bg-white/20'
              }`}
              aria-pressed={soundEnabled}
              aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
              title={soundEnabled ? 'Sound ON (click to mute)' : 'Sound OFF (click to enable)'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Mobile Game Menu Button */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden min-h-[44px] min-w-[44px] rounded-xl bg-mario-red border-2 border-white flex items-center justify-center text-white cursor-pointer"
              aria-expanded={menuOpen}
              aria-label="Toggle Game Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* DESKTOP GAME MENU BAR (ARCADE LEVEL SELECT) */}
        <nav
          aria-label="World Navigation"
          className="hidden md:flex pointer-events-auto items-center justify-between gap-2 bg-white/95 border-[3px] border-mario-ink rounded-2xl px-3 py-1.5 shadow-toon-sm"
        >
          <div className="flex items-center gap-1.5">
            {NAV_ITEMS.map((item) =>
              'external' in item && item.external ? (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-3.5 rounded-xl font-arcade text-xs font-bold text-mario-ink hover:bg-mario-sky/15 hover:text-mario-skyDark flex items-center gap-1.5 transition-colors"
                >
                  <span>{item.label}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className="min-h-[44px] px-3.5 rounded-xl font-arcade text-xs font-bold text-mario-ink hover:bg-mario-coin/35 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-mario-pipe" aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              )
            )}
          </div>

          <div className="flex items-center gap-2">
            {starPower && (
              <span className="px-3 py-1 rounded-full bg-mario-coin border-2 border-mario-ink font-pixel text-[9px] text-mario-ink animate-pulse">
                ★ STAR POWER!
              </span>
            )}
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="toon-btn-red !py-2 !px-4 !text-xs"
            >
              ★ Hire Me
            </button>
          </div>
        </nav>

        {/* MOBILE DROPDOWN GAME MENU */}
        {menuOpen && (
          <nav
            aria-label="Mobile World Navigation"
            className="md:hidden pointer-events-auto toon-panel p-3 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between px-2 pb-1.5 border-b-2 border-dashed border-mario-ink/20">
              <span className="font-pixel text-[10px] text-mario-skyDark">{activeWorld}</span>
              <span className="font-arcade text-[10px] text-mario-ink/70">SELECT STAGE</span>
            </div>
            {NAV_ITEMS.map((item) =>
              'external' in item && item.external ? (
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
                  className="min-h-[44px] px-3 rounded-xl font-arcade text-sm font-bold text-mario-ink hover:bg-mario-coin/30 flex items-center justify-between text-left"
                >
                  <span>{item.label}</span>
                  <span className="font-pixel text-[9px] text-mario-pipe">WARP →</span>
                </button>
              )
            )}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onNavigate('contact');
              }}
              className="toon-btn-red w-full mt-1"
            >
              ★ Hire Me
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
