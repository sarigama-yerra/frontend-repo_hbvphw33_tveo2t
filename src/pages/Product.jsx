import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function ProductPage({ onAdd }){
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    fetch(`${API}/api/products/${id}`)
      .then(r => r.json())
      .then(d => setProduct(d))
  }, [id])

  if(!product) return <div className="min-h-screen grid place-items-center text-rose-700/70">Loading…</div>

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-pink-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-10">
        <div className="aspect-square rounded-3xl overflow-hidden border border-pink-200 bg-white">
          <img src={product.images?.[0]} alt={product.title} className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-rose-900">{product.title}</h1>
          <div className="mt-2 text-fuchsia-700 text-xl font-semibold">${product.price?.toFixed?.(2) ?? product.price}</div>
          <p className="mt-3 text-rose-700/80">{product.description}</p>
          {product.highlights?.length > 0 && (
            <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-rose-800">
              {product.highlights.map((h,i)=> <li key={i} className="before:content-['✦'] before:text-fuchsia-600 before:mr-2">{h}</li>)}
            </ul>
          )}
          <div className="mt-6 flex items-center gap-3">
            <div className="inline-flex items-center gap-2 border rounded-xl px-3 py-2">
              <button onClick={()=> setQty(q => Math.max(1, q-1))} className="px-2 py-1 bg-rose-100 rounded">-</button>
              <span className="min-w-[28px] text-center">{qty}</span>
              <button onClick={()=> setQty(q => q+1)} className="px-2 py-1 bg-pink-100 rounded">+</button>
            </div>
            <button onClick={() => onAdd?.({...product, quantity: qty})} className="px-5 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white">Add to cart</button>
          </div>
        </div>
      </div>
    </main>
  )
}
