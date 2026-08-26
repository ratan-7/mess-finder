export default function PlanModal({ mess, onClose, onSelectPlan }) {
  if (!mess) return null;

  return (
    <div
      className="fixed inset-0 bg-ink/60 flex items-center justify-center p-5 z-50"
      onClick={onClose}
    >
      <div
        className="bg-cream rounded-2xl p-6 w-full max-w-sm border-[1.5px] border-ink"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-display font-semibold text-xl text-ink mb-1">
          Choose a plan
        </h3>
        <p className="text-xs text-muted mb-5">
          Unlock "{mess.name}" or get access to everything.
        </p>

        <button
          onClick={() => onSelectPlan("category")}
          className="w-full text-left border-[1.5px] border-ink rounded-lg p-4 mb-3 hover:bg-turmeric/10"
        >
          <div className="flex items-baseline justify-between mb-1">
            <span className="font-display font-semibold text-base text-ink">
              This category only
            </span>
            <span className="font-mono font-bold text-lg text-chili">₹29</span>
          </div>
          <p className="text-xs text-muted capitalize">
            Unlocks every {mess.category?.replace("-", " ")} mess — 7 days
          </p>
        </button>

        <button
          onClick={() => onSelectPlan("full")}
          className="w-full text-left border-[1.5px] border-chili rounded-lg p-4 mb-4 bg-chili/5 relative"
        >
          <span className="absolute -top-2.5 right-3 bg-chili text-cream text-[10px] font-bold px-2 py-0.5 rounded-full">
            BEST VALUE
          </span>
          <div className="flex items-baseline justify-between mb-1">
            <span className="font-display font-semibold text-base text-ink">
              Full access — 7 days
            </span>
            <span className="font-mono font-bold text-lg text-chili">₹49</span>
          </div>
          <p className="text-xs text-muted">
            Every mess, every category, for a full week
          </p>
        </button>

        <button onClick={onClose} className="w-full text-muted text-xs py-1">
          Cancel
        </button>
      </div>
    </div>
  );
}
