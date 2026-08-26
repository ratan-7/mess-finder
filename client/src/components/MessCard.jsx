const MessCard = ({
  name,
  category,
  address,
  contact,
  budget,
  unlocked,
  onUnlockClick,
}) => {
  return (
    <div className="bg-cream border-2 border-ink rounded-lg p-4">
      <div className="flex gap-3 mb-3">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${unlocked ? "bg-turmeric" : "bg-rose"}`}
        >
          🍱
        </div>
        <div>
          <h3 className="text-lg font-bold text-ink">{name}</h3>
          <p className="text-sm text-muted">{category}</p>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-dashed border-muted pt-3 mb-3">
        <p
          className={`text-sm text-ink ${unlocked ? "" : "blur-sm select-none"}`}
        >
          {unlocked ? address : "Hidden address"}
        </p>
        <p className="text-xl font-bold text-chili">₹{budget}</p>
      </div>

      {unlocked && (
        <div className="flex gap-2 mt-2">
          href={`tel:${contact}`}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 text-center bg-ink text-cream text-sm font-semibold
          py-2 rounded"
          <a>Call now</a>
          href=
          {`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
          target="_blank" rel="noopener noreferrer" onClick=
          {(e) => e.stopPropagation()}
          className="flex-1 text-center border border-ink text-ink text-sm
          font-semibold py-2 rounded"
          <a>Directions</a>
        </div>
      )}
    </div>
  );
};

export default MessCard;
