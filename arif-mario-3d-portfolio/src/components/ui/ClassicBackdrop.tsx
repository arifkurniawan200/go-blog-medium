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
      {/* Stylized 2D Clouds */}
      <div className="absolute top-24 left-[8%] w-28 h-10 bg-white rounded-full border-[3px] border-mario-ink/20 animate-float-cloud opacity-90" />
      <div className="absolute top-40 right-[12%] w-36 h-12 bg-white rounded-full border-[3px] border-mario-ink/20 animate-float-cloud opacity-85" />
      <div className="absolute top-72 left-[42%] w-24 h-8 bg-white rounded-full border-[3px] border-mario-ink/15 opacity-75" />

      {/* Rolling 2D Green Hills */}
      <div className="absolute bottom-14 -left-16 w-80 h-56 rounded-t-full bg-[#22C55E] border-[4px] border-mario-ink/30" />
      <div className="absolute bottom-14 left-1/3 w-96 h-64 rounded-t-full bg-[#16A34A] border-[4px] border-mario-ink/30" />
      <div className="absolute bottom-14 -right-20 w-80 h-52 rounded-t-full bg-[#22C55E] border-[4px] border-mario-ink/30" />

      {/* Bottom Grass & Brick Ground */}
      <div className="absolute bottom-12 left-0 right-0 h-5 bg-mario-pipe border-y-[3px] border-mario-ink" />
      <div className="absolute bottom-0 left-0 right-0 h-12 brick-pattern" />
    </div>
  );
}
