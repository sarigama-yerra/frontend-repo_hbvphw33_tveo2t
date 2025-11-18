import { ShoppingCart, Menu } from 'lucide-react'

export default function Navbar({ cartCount, onCartOpen }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-pink-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-600" />
          <span className="font-semibold text-rose-900">Celeste</span>
        </a>
        <nav className="hidden sm:flex items-center gap-6 text-rose-800/80">
          <a href="/catalog" className="hover:text-rose-900">Catalogue</a>
          <a href="#featured" className="hover:text-rose-900">Featured</a>
          <a href="#about" className="hover:text-rose-900">About</a>
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={onCartOpen} className="relative inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white">
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 h-5 min-w-[20px] px-1 rounded-full bg-white text-fuchsia-700 text-xs grid place-items-center">
                {cartCount}
              </span>
            )}
          </button>
          <button className="sm:hidden p-2 text-rose-900"><Menu /></button>
        </div>
      </div>
    </header>
  )
}
