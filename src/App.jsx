import { useEffect, useMemo, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Featured from './components/Featured'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Catalog from './pages/Catalog'
import ProductPage from './pages/Product'
import Checkout from './pages/Checkout'

function useCart() {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart') || '[]') } catch { return [] }
  })
  useEffect(() => { localStorage.setItem('cart', JSON.stringify(items)) }, [items])

  const add = (p) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === p.id)
      if (exists) return prev.map(i => i.id === p.id ? { ...i, quantity: (i.quantity || 1) + (p.quantity || 1) } : i)
      return [...prev, { ...p, quantity: p.quantity || 1 }]
    })
  }
  const remove = (p) => {
    setItems(prev => prev.flatMap(i => {
      if (i.id !== p.id) return [i]
      const q = (i.quantity || 1) - 1
      return q <= 0 ? [] : [{ ...i, quantity: q }]
    }))
  }
  const clear = () => setItems([])

  const count = useMemo(() => items.reduce((s,i)=> s + (i.quantity||1), 0), [items])
  return { items, add, remove, clear, count }
}

function Home({ onAdd }){
  return (
    <main className="bg-white min-h-screen">
      <Hero />
      <Featured onAdd={onAdd} />
      <Footer />
    </main>
  )
}

function App() {
  const { items, add, remove, clear, count } = useCart()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const goCheckout = () => { setOpen(false); navigate('/checkout') }

  return (
    <div className="min-h-screen bg-white">
      <Navbar cartCount={count} onCartOpen={() => setOpen(true)} />
      <Routes>
        <Route path="/" element={<Home onAdd={add} />} />
        <Route path="/catalog" element={<Catalog onAdd={add} />} />
        <Route path="/product/:id" element={<ProductPage onAdd={add} />} />
        <Route path="/checkout" element={<Checkout cartItems={items} onClear={clear} />} />
      </Routes>
      <CartDrawer open={open} items={items} onClose={() => setOpen(false)} onAdd={add} onRemove={remove} onCheckout={goCheckout} />
    </div>
  )
}

export default App
