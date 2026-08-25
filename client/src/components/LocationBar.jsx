const LocationBar = () => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-turmeric/20 border-b border-dashed border-muted">
      <span className="text-chili text-sm">📍</span>
      <span className="text-sm text-muted">Showing mess near</span>
      <span className="text-sm font-bold text-ink">
        Kalyani,Nadia, West Bengal
      </span>
    </div>
  );
};

export default LocationBar;
