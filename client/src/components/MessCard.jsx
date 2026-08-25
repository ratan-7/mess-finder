const MessCard = ({
  name,
  category,
  address,
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

      {!unlocked && (
        <button
          onClick={onUnlockClick}
          className="w-full bg-chili text-cream font-semibold py-2 rounded"
        >
          Unlock full details
        </button>
      )}
    </div>
  );
};

export default MessCard;
