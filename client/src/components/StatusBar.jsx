export default function StatsBar({ count }) {
  return (
    <div className="max-w-5xl mx-auto px-4 mb-4">
      <div className="bg-cream border-2 border-dashed border-ink rounded-lg py-2 text-center">
        <span className="font-bold text-chili">{count}+</span>
        <span className="text-sm text-ink"> mess available near you</span>
      </div>
    </div>
  );
}
