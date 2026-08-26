export default function DetailSheet({ mess, onClose, onUnlockClick }) {
  if (!mess) return null;

  return (
    <div
      className="fixed inset-0 bg-ink/60 flex items-end sm:items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-cream w-full sm:w-auto sm:min-w-[420px] max-w-md max-h-[88vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border-t-2 sm:border-2 border-ink"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="h-36 flex items-center justify-center rounded-t-2xl"
          style={{ background: mess.unlocked ? "#E8A23A" : "#D4577E" }}
        >
          {mess.image ? (
            <img
              src={mess.image}
              alt={mess.name}
              className="w-full h-full object-cover rounded-t-2xl"
            />
          ) : (
            <span className="text-4xl">🍱</span>
          )}
        </div>

        <div className="p-5">
          <h3 className="font-display font-bold text-2xl text-ink mb-0.5">
            {mess.name}
          </h3>
          <div className="text-sm text-muted mb-4 capitalize">
            {mess.category?.replace("-", " ")}
          </div>

          {mess.unlocked ? (
            <>
              {mess.description && (
                <p className="text-sm text-ink/80 leading-relaxed mb-4">
                  {mess.description}
                </p>
              )}

              <div className="border-t border-dashed border-dash border-b py-3.5 mb-4 space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-[11px] text-muted uppercase tracking-wide">
                    Address
                  </span>
                  <span className="text-sm text-ink text-right max-w-[60%]">
                    {mess.address}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[11px] text-muted uppercase tracking-wide">
                    Phone
                  </span>
                  <span className="text-sm text-ink font-semibold">
                    {mess.contact}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[11px] text-muted uppercase tracking-wide">
                    Monthly
                  </span>
                  <span className="font-mono text-sm text-chili font-bold">
                    ₹{mess.budget}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mb-3">
                <a
                  href={`tel:${mess.contact}`}
                  className="flex-1 text-center bg-ink text-cream text-sm font-semibold rounded-md py-2.5"
                >
                  Call now
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mess.address || mess.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center border-[1.5px] border-ink text-ink text-sm font-semibold rounded-md py-2.5"
                >
                  Directions
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="blur-[3px] select-none pointer-events-none mb-4">
                <p className="text-sm text-ink/70 leading-relaxed">
                  Full description, contact and address are hidden until
                  unlocked.
                </p>
              </div>

              <button
                onClick={() => onUnlockClick(mess)}
                className="w-full bg-chili text-cream text-sm font-semibold rounded-md py-3 mb-3"
              >
                Unlock full details
              </button>
            </>
          )}

          <button onClick={onClose} className="w-full text-muted text-xs py-1">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
