export default function Footer() {
  return (
    <footer className="bg-ink text-cream mt-10">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="font-bold text-lg mb-2">
          mess<span className="text-turmeric">khoj</span>
        </div>
        <p className="text-xs text-cream/60 mb-4">
          Find a hostel mess or tiffin service near you.
        </p>

        <div className="text-sm font-semibold mb-1">Customer support</div>
        <a
          href="mailto:ratanmahata116@gmail.com"
          className="text-xs text-turmeric underline"
        >
          ratanmahata116@gmail.com
        </a>

        <div className="text-xs text-cream/40 mt-6">
          © 2026 mess khoj.Made with ♥️ by{" "}
          <a href="https://ratanmahata.in">ratanmahata</a>
        </div>
      </div>
    </footer>
  );
}
