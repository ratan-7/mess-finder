import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-kraft-dots flex items-center justify-center px-4">
      <div className="bg-cream border-[1.5px] border-ink rounded-lg p-8 max-w-sm text-center">
        <div className="text-5xl mb-4">🍱</div>
        <h1 className="font-display font-bold text-3xl text-ink mb-2">404</h1>
        <p className="text-sm text-muted mb-6">
          Ye mess yaha nahi mila — shayad galat address pe pahunch gaye ho.
        </p>
        <Link
          to="/"
          className="inline-block bg-chili text-cream text-sm font-semibold px-5 py-2.5 rounded-md"
        >
          Go to Home Page
        </Link>
      </div>
    </div>
  );
}
