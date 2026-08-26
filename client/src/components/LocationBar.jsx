export default function LocationBanner() {
  return (
    <div className="bg-banner border-b border-dashed border-dash-dark">
      <div className="max-w-4xl mx-auto px-4 py-2 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-chili opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-chili"></span>
        </span>
        <span className="text-xs text-ink/70">Showing mess near</span>
        <span className="text-xs font-bold text-ink">
          kalyani,Nadia,West Bengal,741235
        </span>
      </div>
    </div>
  );
}
