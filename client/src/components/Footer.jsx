export default function Footer() {
  return (
    <footer className="bg-ink text-cream mt-10">
      <div className="max-w-4xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <div className="font-display font-bold text-lg mb-2">
            mess<span className="text-turmeric">khoj</span>
          </div>
          <p className="text-xs text-cream/60 leading-relaxed">
            Find a hostel mess or tiffin service near you — verified listings,
            direct contact, no middleman.
          </p>
        </div>

        <div>
          <div className="font-display font-semibold text-sm mb-3">
            Customer support
          </div>
          <p className="text-xs text-cream/60 mb-2 leading-relaxed">
            Payment issue, wrong listing, or anything else — write to us.
          </p>
          <a
            href="mailto:ratanmahata116@gmail.com"
            className="text-xs font-semibold text-turmeric underline underline-offset-2"
          >
            ratanmahata116@gmail.com
          </a>
        </div>

        <div>
          <div className="font-display font-semibold text-sm mb-3">
            For mess owners
          </div>
          <p className="text-xs text-cream/60 leading-relaxed">
            Want your mess listed? Contact our team to get added.
          </p>
        </div>
      </div>

      <div className="border-t border-cream/10 py-4 text-center text-[11px] text-cream/40">
        © {new Date().getFullYear()} messkhoj . Made with ♥️ by{" "}
        <a href="https://ratanmahata.in">ratanmahata</a>
      </div>
    </footer>
  );
}
