export default function ProductGrid({ products = [], onAdd }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(p => (
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
  )
}
