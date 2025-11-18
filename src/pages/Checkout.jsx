import { useMemo, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Checkout({ cartItems = [], onClear }){
  const subtotal = useMemo(() => cartItems.reduce((s, i) => s + i.price * i.quantity, 0), [cartItems])
  const shipping = subtotal >= 100 ? 0 : 6
  const total = (subtotal + shipping).toFixed(2)
  const [form, setForm] = useState({
    customer_name: '', customer_email: '', address_line1: '', address_line2: '', city: '', state: '', postal_code: '', country: 'US', notes: ''
  })
  const [status, setStatus] = useState('idle')
  const [orderId, setOrderId] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const payload = { items: cartItems.map(i => ({ product_id: i.id, quantity: i.quantity })), ...form }
      const res = await fetch(`${API}/api/checkout`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      setOrderId(data.order_id || 'demo-order')
      setStatus('success')
      onClear?.()
    } catch (e) {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <main className="min-h-screen grid place-items-center bg-gradient-to-b from-white via-pink-50 to-white px-6">
        <div className="max-w-md w-full bg-white border border-pink-200 rounded-2xl p-6 text-center">
          <h1 className="text-2xl font-semibold text-rose-900">Thank you!</h1>
          <p className="mt-2 text-rose-700/80">Your order has been placed.</p>
          <p className="mt-2 text-sm text-rose-700/70">Order ID: <span className="font-mono">{orderId}</span></p>
          <a href="/" className="mt-6 inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white">Back to home</a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-pink-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-10">
        <div>
          <h1 className="text-2xl font-semibold text-rose-900 mb-4">Checkout</h1>
          <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white border border-pink-200 rounded-2xl p-6">
            <input required placeholder="Full name" className="input" value={form.customer_name} onChange={e=>setForm({...form, customer_name:e.target.value})} />
            <input required type="email" placeholder="Email" className="input" value={form.customer_email} onChange={e=>setForm({...form, customer_email:e.target.value})} />
            <input required placeholder="Address line 1" className="input sm:col-span-2" value={form.address_line1} onChange={e=>setForm({...form, address_line1:e.target.value})} />
            <input placeholder="Address line 2" className="input sm:col-span-2" value={form.address_line2} onChange={e=>setForm({...form, address_line2:e.target.value})} />
            <input required placeholder="City" className="input" value={form.city} onChange={e=>setForm({...form, city:e.target.value})} />
            <input required placeholder="State" className="input" value={form.state} onChange={e=>setForm({...form, state:e.target.value})} />
            <input required placeholder="Postal code" className="input" value={form.postal_code} onChange={e=>setForm({...form, postal_code:e.target.value})} />
            <input placeholder="Country" className="input" value={form.country} onChange={e=>setForm({...form, country:e.target.value})} />
            <textarea placeholder="Order notes" className="input sm:col-span-2" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} />
            <button disabled={status==='loading'} className="sm:col-span-2 px-4 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white">Pay ${total}</button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-rose-900 mb-4">Summary</h2>
          <div className="space-y-3">
            {cartItems.map(i => (
              <div key={i.id} className="flex items-center gap-3 bg-white border border-pink-200 rounded-2xl p-3">
                <img src={i.images?.[0]} alt={i.title} className="h-16 w-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-rose-900">{i.title}</div>
                    <div className="text-rose-900">${(i.price * i.quantity).toFixed(2)}</div>
                  </div>
                  <div className="text-sm text-rose-700/70">Qty {i.quantity}</div>
                </div>
              </div>
            ))}
            <div className="bg-white border border-pink-200 rounded-2xl p-4 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shipping===0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between font-semibold text-rose-900"><span>Total</span><span>${total}</span></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
