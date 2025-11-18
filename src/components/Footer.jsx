export default function Footer(){
  return (
    <footer id="about" className="mt-16 border-t bg-white">
      <div className="max-w-6xl mx-auto px-6 py-10 grid sm:grid-cols-3 gap-8 text-sm text-rose-700/80">
        <div>
          <div className="font-semibold text-rose-900">Celeste Atelier</div>
          <p className="mt-2">Anti‑tarnish, hypoallergenic jewellery in modern pink and purple tones.</p>
        </div>
        <div>
          <div className="font-semibold text-rose-900">Care</div>
          <ul className="mt-2 space-y-1">
            <li>Anti‑tarnish protective coating</li>
            <li>Water and sweat resistant</li>
            <li>Store in pouch when not wearing</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-rose-900">Contact</div>
          <ul className="mt-2 space-y-1">
            <li>support@celesteatelier.example</li>
            <li>Mon–Fri 9am–5pm</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
