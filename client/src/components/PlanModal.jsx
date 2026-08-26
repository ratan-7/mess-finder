const PlanModal = ({ mess, onSelectPlan, onClose }) => {
  return (
    <div className="fixed inset-0 bg-ink/60 flex items-center justify-center">
      <div className="bg-cream rounded-lg p-6 w-80">
        <h3 className="text-xl font-bold text-ink mb-1">Choose a plan</h3>
        <p className="text-sm text-muted mb-4">Unlock "{mess.name}"</p>

        <button
          onClick={() => onSelectPlan("category")}
          className="w-full text-left border-2 border-ink rounded p-3 mb-2"
        >
          <div className="flex justify-between font-bold text-ink">
            <span>This category only</span>
            <span className="text-chili">₹29</span>
          </div>
        </button>

        <button
          onClick={() => onSelectPlan("full")}
          className="w-full text-left border-2 border-chili rounded p-3 mb-4"
        >
          <div className="flex justify-between font-bold text-ink">
            <span>Full access — 7 days</span>
            <span className="text-chili">₹49</span>
          </div>
        </button>

        <button onClick={onClose} className="w-full text-muted text-sm">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PlanModal;
