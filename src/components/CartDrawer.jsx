import { useMemo } from 'react'

export default function CartDrawer({ open, items, onClose, onAdd, onRemove, onCheckout }) {
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.quantity, 0), [items])
  const shipping = subtotal >= 100 ? 0 : 6
  const total = (subtotal + shipping).toFixed(2)

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <aside className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-16 flex items-center justify-between px-5 border-b">
          <h3 className="font-semibold text-rose-900">Your Cart</h3>
          <button onClick={onClose} className="text-rose-700/70">Close</button>
        </div>
        <div className="p-5 space-y-4 overflow-y-auto h-[calc(100%-8rem)]">
          {items.length === 0 && (
            <p className="text-rose-700/70">Your cart is empty.</p>
          )}
          {items.map((i) => (
            <div key={i.id} className="flex gap-3 border rounded-xl p-3">
              <img src={i.images?.[0]} alt={i.title} className="h-16 w-16 rounded-lg object-cover" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-rose-900 line-clamp-1">{i.title}</h4>
                  <span className="text-fuchsia-700">${(i.price * i.quantity).toFixed(2)}</span>
                </div>
                <div className="mt-1 text-sm text-rose-700/70">${i.price.toFixed(2)} • x{i.quantity}</div>
                <div className="mt-2 inline-flex items-center gap-2">
                  <button onClick={() => onRemove?.(i)} className="px-2 py-1 rounded-lg bg-rose-100">-</button>
                  <span className="min-w-[24px] text-center">{i.quantity}</span>
                  <button onClick={() => onAdd?.(i)} className="px-2 py-1 rounded-lg bg-pink-100">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-16 border-t px-5 flex items-center justify-between">
          <div className="text-sm">
            <div className="text-rose-900">Subtotal ${subtotal.toFixed(2)}</div>
            <div className="text-rose-700/70">Shipping {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</div>
          </div>
          <button disabled={items.length===0} onClick={onCheckout} className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white disabled:opacity-50">Checkout ${total}</button>
        </div>
      </aside>
    </div>
  )
}
