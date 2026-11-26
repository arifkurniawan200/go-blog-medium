/**
 * Lightweight 2D Classic Mode backdrop (zero WebGL overhead) for mobile/low-end
 * devices or users with prefers-reduced-motion enabled.
 */
export function ClassicBackdrop() {
  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none"
      style={{
        background: 'linear-gradient(180deg, #5C94FC 0%, #80B0FF 65%, #A7D0FF 100%)'
      }}
      aria-hidden="true"
    >
      {/* Stylized 2D Drifting Clouds */}
      <div className="absolute top-24 left-[8%] w-28 h-10 bg-white rounded-full border-[3px] border-mario-ink/20 animate-cloud-drift opacity-90" />
      <div
        className="absolute top-40 right-[12%] w-36 h-12 bg-white rounded-full border-[3px] border-mario-ink/20 animate-cloud-drift opacity-85"
        style={{ animationDelay: '-4s' }}
      />
      <div
        className="absolute top-72 left-[42%] w-24 h-8 bg-white rounded-full border-[3px] border-mario-ink/15 animate-float-cloud opacity-75"
        style={{ animationDelay: '-2s' }}
      />

      {/* Playful Floating 2D Coins in Sky */}
      <div className="absolute top-[30%] left-[22%] w-7 h-7 rounded-full bg-mario-coin border-2 border-mario-ink/60 flex items-center justify-center font-pixel text-[9px] text-mario-ink opacity-70 animate-coin-spin">
        $
      </div>
      <div
        className="absolute top-[24%] right-[26%] w-7 h-7 rounded-full bg-mario-coin border-2 border-mario-ink/60 flex items-center justify-center font-pixel text-[9px] text-mario-ink opacity-70 animate-coin-spin"
        style={{ animationDelay: '-1.2s' }}
      />

      {/* Rolling 2D Green Hills */}
      <div className="absolute bottom-14 -left-16 w-80 h-56 rounded-t-full bg-[#22C55E] border-[4px] border-mario-ink/30" />
      <div className="absolute bottom-14 left-1/3 w-96 h-64 rounded-t-full bg-[#16A34A] border-[4px] border-mario-ink/30" />
      <div className="absolute bottom-14 -right-20 w-80 h-52 rounded-t-full bg-[#22C55E] border-[4px] border-mario-ink/30" />

      {/* Decorative Mini Warp Pipe on Right */}
      <div className="hidden sm:block absolute bottom-16 right-[9%] w-14 h-16 pipe-sheen border-[3px] border-mario-ink rounded-t-md opacity-90">
        <div className="absolute -top-3 -left-1.5 -right-1.5 h-4 pipe-sheen border-[3px] border-mario-ink rounded-sm" />
      </div>

      {/* Bottom Grass & Brick Ground */}
      <div className="absolute bottom-12 left-0 right-0 h-5 bg-mario-pipe border-y-[3px] border-mario-ink" />
      <div className="absolute bottom-0 left-0 right-0 h-12 brick-pattern" />
    </div>
  );
}
