export default function MessCard({ mess, onCardClick, onUnlockClick }) {
  const iconBg = mess.unlocked ? "bg-turmeric" : "bg-rose";

  return (
    <div
      onClick={() => onCardClick(mess)}
      className="relative bg-cream border-[1.5px] border-ink rounded p-4 cursor-pointer"
    >
      {mess.isFreeSample && (
        <div className="absolute -top-2.5 left-4 bg-turmeric text-ink text-[10px] font-bold px-2.5 py-1 -rotate-3 border-[1.5px] border-dashed border-ink rounded">
          FREE SAMPLE
        </div>
      )}

      <div className={`flex gap-3 ${mess.isFreeSample ? "mt-1.5" : ""} mb-3`}>
        <div
          className={`w-14 h-14 rounded-full ${iconBg} border-2 border-ink flex items-center justify-center flex-shrink-0 overflow-hidden`}
        >
          {mess.image ? (
            <img
              src={mess.image}
              alt={mess.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl">🍱</span>
          )}
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-ink leading-tight">
            {mess.name}
          </h3>
          <div className="text-xs text-muted capitalize">
            {mess.category?.replace("-", " ")}
          </div>
        </div>
      </div>

      <div className="flex items-baseline justify-between border-t border-b border-dashed border-dash py-2.5 mb-3">
        <div
          className={
            mess.unlocked ? "" : "blur-[3px] select-none pointer-events-none"
          }
        >
          <div className="text-[10px] text-muted uppercase tracking-wide">
            Address
          </div>
          <div className="text-sm text-ink">
            {mess.unlocked ? mess.address : "XX road, hidden area"}
          </div>
        </div>
        <div className="text-right flex-shrink-0 ml-3">
          <div className="text-[10px] text-muted uppercase tracking-wide">
            Monthly
          </div>
          <div className="font-mono font-bold text-[17px] text-chili">
            ₹{mess.budget}
          </div>
        </div>
      </div>

      {mess.unlocked ? (
        <div className="flex gap-2">
          <a
            href={`tel:${mess.contact}`}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 text-center bg-ink text-cream text-sm font-semibold rounded py-2.5"
          >
            Call now
          </a>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mess.address || mess.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 text-center border-[1.5px] border-ink text-ink text-sm font-semibold rounded py-2.5"
          >
            Directions
          </a>
        </div>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUnlockClick(mess);
          }}
          className="w-full bg-chili text-cream text-sm font-semibold rounded py-3 flex items-center justify-center gap-2"
        >
          <span className="w-5.5 h-5.5 rounded-full bg-cream text-chili flex items-center justify-center text-xs">
            🔒
          </span>
          Unlock full details — ₹19
        </button>
      )}
    </div>
  );
}
