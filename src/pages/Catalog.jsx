import { useEffect, useState } from 'react'
import ProductGrid from '../components/ProductGrid'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Catalog({ onAdd }){
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const url = new URL(`${API}/api/products`)
    if(category) url.searchParams.set('category', category)
    fetch(url)
      .then(r=>r.json())
      .then(d=>setProducts(d))
      .finally(()=>setLoading(false))
  }, [category])

  const cats = ['All','Rings','Necklaces','Bracelets','Earrings']

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-pink-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-rose-900">Catalogue</h1>
          <div className="flex gap-2">
            {cats.map(c => (
              <button key={c} onClick={()=> setCategory(c==='All' ? '' : c)} className={`px-3 py-1.5 rounded-full border ${category===(c==='All'?'':c) ? 'bg-pink-600 text-white border-pink-600' : 'border-pink-200 text-rose-800'}`}>{c}</button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-pink-100/50 animate-pulse" />
            ))}
          </div>
        ) : (
          <ProductGrid products={products} onAdd={onAdd} />
        )}
      </div>
    </main>
  )
}
