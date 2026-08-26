export default function StatsBar({ count }) {
  return (
    <div className="max-w-md mx-auto sm:max-w-none px-4 mb-5">
      <div className="bg-cream border-[1.5px] border-dashed border-ink rounded-lg py-3 px-4 flex items-center justify-center gap-2">
        <span className="font-mono font-bold text-lg text-chili">{count}+</span>
        <span className="text-sm text-ink/80">mess available near you</span>
      </div>
    </div>
  );
}
