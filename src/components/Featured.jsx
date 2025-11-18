import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Featured({ onAdd }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API}/api/products?limit=8`)
      .then(r => r.json())
      .then(d => setItems(d))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="featured" className="py-16 bg-gradient-to-b from-white via-pink-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-rose-900">Featured pieces</h2>
            <p className="text-rose-700/70">Curated favourites in pink and purple tones</p>
          </div>
          <a href="/catalog" className="text-fuchsia-700 hover:text-fuchsia-900">See all</a>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-pink-100/50 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map(p => (
              <article key={p.id} className="group rounded-2xl border border-pink-200 bg-white overflow-hidden hover:shadow-xl transition">
                <a href={`/product/${p.id}`} className="block aspect-square overflow-hidden">
                  <img src={p.images?.[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                </a>
                <div className="p-4">
                  <h3 className="font-medium text-rose-900 line-clamp-1">{p.title}</h3>
                  <p className="text-rose-700/70 text-sm line-clamp-2 mt-1">{p.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-fuchsia-700 font-semibold">${p.price?.toFixed?.(2) ?? p.price}</span>
                    <button onClick={() => onAdd?.(p)} className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white text-sm">Add</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
