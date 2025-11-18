import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-pink-100 via-pink-50 to-white">
      <div className="absolute inset-0 opacity-70">
        <Spline scene="https://prod.spline.design/HldEaEeFcKnMlQB3/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-4 py-2 text-sm text-rose-600 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-fuchsia-500 animate-pulse" />
          Anti‑tarnish jewellery • Hypoallergenic • Everyday shine
        </div>
        <h1 className="mt-6 text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-fuchsia-600 via-pink-600 to-purple-700 bg-clip-text text-transparent">
          Celeste Atelier
        </h1>
        <p className="mt-4 text-base sm:text-lg text-rose-700/80 max-w-2xl mx-auto">
          Modern pieces that sparkle like new, season after season. Explore rings, necklaces, bracelets and earrings—crafted to resist tarnish and keep their glow.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a href="#featured" className="px-5 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white shadow-lg hover:shadow-pink-300/50 transition">Shop featured</a>
          <a href="/catalog" className="px-5 py-3 rounded-xl bg-white text-fuchsia-700 border border-pink-200 hover:bg-pink-50 transition">Browse all</a>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
