export default function DetailSheet({ mess, onClose, onUnlockClick }) {
  if (!mess) return null;

  return (
    <div
      className="fixed inset-0 bg-ink/60 flex items-end justify-center"
      onClick={onClose}
    >
      <div
        className="bg-cream w-full max-w-md rounded-t-2xl border-t-2 border-ink p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-ink mb-1">{mess.name}</h2>
        <p className="text-sm text-muted mb-4">{mess.category}</p>

        {mess.unlocked ? (
          <div className="border-t border-dashed border-dash pt-3 mb-4">
            <p className="text-sm text-ink mb-1">
              <span className="text-muted">Address: </span>
              {mess.address}
            </p>
            <p className="text-sm text-ink mb-1">
              <span className="text-muted">Contact: </span>
              {mess.contact}
            </p>
            <p className="text-sm text-ink mb-3">{mess.description}</p>

            <div className="flex gap-2">
              href={`tel:${mess.contact}`}
              className="flex-1 text-center bg-ink text-cream text-sm
              font-semibold py-2 rounded"
              <a>Call now</a>
              href=
              {`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mess.address)}`}
              target="_blank" rel="noopener noreferrer" className="flex-1
              text-center border border-ink text-ink text-sm font-semibold py-2
              rounded"
              <a>Directions</a>
            </div>
          </div>
        ) : (
          <>
            <div className="border-t border-dashed border-dash pt-3 mb-4 blur-sm select-none">
              <p className="text-sm text-ink">
                Address, contact and description are hidden.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onUnlockClick(mess);
              }}
              className="w-full bg-chili text-cream font-semibold py-2 rounded mb-2"
            >
              Unlock full details
            </button>
          </>
        )}

        <button onClick={onClose} className="w-full text-muted text-sm py-1">
          Close
        </button>
      </div>
    </div>
  );
}
