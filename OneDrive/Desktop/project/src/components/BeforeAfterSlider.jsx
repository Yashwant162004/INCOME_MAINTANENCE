import { useState } from 'react';

export default function BeforeAfterSlider({ before, after }) {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative my-6 w-full overflow-hidden rounded-3xl border border-amber-200/20">
      <img src={before} alt="Before" className="h-72 w-full object-cover" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-y-0 left-0" style={{ width: `${position}%` }}>
          <img src={after} alt="After" className="h-72 w-full object-cover" />
        </div>
      </div>
      <input type="range" value={position} onChange={(e) => setPosition(Number(e.target.value))} className="absolute bottom-4 left-1/2 w-3/4 -translate-x-1/2 cursor-pointer accent-amber-300" aria-label="Before and after slider" />
    </div>
  );
}
