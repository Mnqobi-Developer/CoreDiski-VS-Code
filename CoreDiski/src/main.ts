import './style.css'

type Product = {
  id: number
  club: string
  title: string
  price: string
  oldPrice: string
  badge: string
  trusted?: boolean
  supplier: string
  date: string
  tags: string[]
  image: string
}

const products: Product[] = [
  {
    id: 1,
    club: 'Benfica',
    title: '2024-25 Benfica Away Shirt',
    price: 'EUR 29.99',
    oldPrice: 'EUR 84.99',
    badge: '65% OFF',
    supplier: 'Classicfootballshirt.co.uk',
    date: '1/22/2026',
    tags: ['Adidas', 'Club', '2024-25'],
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 2,
    club: 'Manchester City',
    title: 'Manchester City Home Jersey 2025/26',
    price: 'EUR 50.00',
    oldPrice: 'EUR 100.00',
    badge: '50% OFF',
    trusted: true,
    supplier: 'mancity.com',
    date: '1/7/2026',
    tags: ['PUMA', 'Club', '2025/26'],
    image:
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 3,
    club: 'FFF Womens Team',
    title: "FFF 2025/26 Stadium Goalkeeper Women's Nike Dri-FIT Football Replica",
    price: 'ZAR 1599.99',
    oldPrice: 'ZAR 2199.95',
    badge: '27% OFF',
    supplier: 'Nike.com',
    date: '1/22/2026',
    tags: ['Nike', 'Club', '2025-26'],
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=80',
  },
]

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('App root not found')
}

app.innerHTML = `
  <div class="page">
    <header class="top-nav">
      <div class="nav-content container">
        <div class="brand">
          <div class="brand-logo">CD</div>
          <div>
            <p class="brand-title">CORE DISKI</p>
            <p class="brand-subtitle">Authentic Football Shirts</p>
          </div>
        </div>
        <nav class="icon-nav" aria-label="Main navigation">
          <button class="icon-btn active">⌂</button>
          <button class="icon-btn">⌕</button>
          <button class="icon-btn" id="cartButton">🛒</button>
          <button class="icon-btn" id="favoritesButton">♡</button>
          <button class="icon-btn" id="authToggle">👤</button>
          <button class="icon-btn" id="adminToggle">⚙</button>
        </nav>
      </div>
    </header>

    <main>
      <section class="hero container">
        <div class="hero-logo">CORE DISKI</div>
        <h1>Authentic Football Shirts</h1>
        <p>Discover rare, verified jerseys from every club and nation worldwide.<br />Heritage. Authenticity. Passion.</p>

        <form class="search-shell" id="searchForm">
          <input id="searchInput" type="search" placeholder="Search teams, leagues, or players..." />
          <button type="submit">Search</button>
        </form>

        <div class="popular-links">
          <span>Popular:</span>
          <a href="#">Manchester United</a>
          <a href="#">Barcelona</a>
          <a href="#">Bafana Bafana</a>
          <a href="#">Real Madrid</a>
          <a href="#">PSG</a>
        </div>
      </section>

      <section class="deals container">
        <div class="section-head">
          <div>
            <h2>🔥 Official Deals</h2>
            <p>Verified discounts from official stores - Buy safely through CoreDiski</p>
          </div>
          <button class="ghost-btn">View All</button>
        </div>

        <div class="card-grid" id="dealGrid"></div>

        <div class="buyer-protection">
          <strong>🛡 Buyer Protection</strong>
          <p>All purchases must be completed through CoreDiski for secure payment processing, buyer protection, and order tracking. We verify authenticity and facilitate safe transactions.</p>
        </div>
      </section>

      <section class="alerts container">
        <div class="section-head">
          <div>
            <h2>Your Deal Alerts</h2>
            <p>Get notified when deals match your preferences</p>
          </div>
          <button class="dark-btn" id="addAlert">＋ Add Alert</button>
        </div>
        <div class="empty-state" id="alertState">
          <div class="empty-icon">🔔</div>
          <h3>No alerts set up yet</h3>
          <p>Create alerts to get notified about deals you care about</p>
          <button class="dark-btn">＋ Create Your First Alert</button>
        </div>
      </section>

      <section class="newsletter container">
        <h2>Join the Football Culture</h2>
        <p>Get early access to rare finds, exclusive deals, and the latest drops from clubs worldwide.</p>
        <form id="newsletterForm" class="newsletter-form">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      <section class="admin-panel container" id="adminPanel" hidden>
        <h2>Administration Portal</h2>
        <p>Add shirts to the catalog as an administrator.</p>
        <form id="adminForm" class="admin-form">
          <input name="club" placeholder="Club name" required />
          <input name="title" placeholder="Shirt title" required />
          <input name="price" placeholder="Price (e.g. EUR 99.99)" required />
          <input name="supplier" placeholder="Official supplier" required />
          <button type="submit">Add Shirt</button>
        </form>
      </section>
    </main>

    <footer class="container footer">
      <div>
        <p class="brand-title">CORE DISKI</p>
        <p>EST 2022 · Authentic Jersey Marketplace</p>
      </div>
      <p>© 2024 Core Diski. All rights reserved.</p>
    </footer>
  </div>
`

const dealGrid = document.getElementById('dealGrid')
const favoritesButton = document.getElementById('favoritesButton') as HTMLButtonElement
const cartButton = document.getElementById('cartButton') as HTMLButtonElement
const authToggle = document.getElementById('authToggle') as HTMLButtonElement
const adminToggle = document.getElementById('adminToggle') as HTMLButtonElement
const adminPanel = document.getElementById('adminPanel') as HTMLElement

let cartCount = 0
let favoriteCount = 0
let isLoggedIn = false
let isAdmin = false

const renderProducts = () => {
  if (!dealGrid) return
  dealGrid.innerHTML = products
    .map(
      (product) => `
      <article class="deal-card" data-id="${product.id}">
        <div class="deal-image" style="background-image:url('${product.image}')">
          ${product.trusted ? '<span class="pill verified">Verified</span>' : ''}
          <span class="pill discount">${product.badge}</span>
        </div>
        <h3>${product.club}</h3>
        <p class="item-title">${product.title}</p>
        <div class="chip-row">${product.tags.map((t) => `<span>${t}</span>`).join('')}</div>
        <p class="price">${product.price}</p>
        <p class="old-price">${product.oldPrice}</p>
        <p class="meta">Detected: ${product.date}</p>
        <p class="meta">Official: ${product.supplier}</p>
        <div class="card-actions">
          <button class="small-btn favorite">♡ Favorite</button>
          <button class="small-btn cart">＋ Cart</button>
        </div>
        <button class="visit-btn">Visit Official Store</button>
      </article>
    `,
    )
    .join('')
}

renderProducts()

const updateIconCounters = () => {
  cartButton.textContent = `🛒 ${cartCount}`
  favoritesButton.textContent = `♡ ${favoriteCount}`
}

updateIconCounters()

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement

  if (target.classList.contains('favorite')) {
    favoriteCount += 1
    updateIconCounters()
  }

  if (target.classList.contains('cart')) {
    if (!isLoggedIn) {
      alert('Please log in or register before adding to cart.')
      return
    }
    cartCount += 1
    updateIconCounters()
  }
})

authToggle.addEventListener('click', () => {
  isLoggedIn = !isLoggedIn
  authToggle.textContent = isLoggedIn ? '✅' : '👤'
})

adminToggle.addEventListener('click', () => {
  if (!isLoggedIn) {
    alert('Log in first to access the admin portal.')
    return
  }
  isAdmin = !isAdmin
  adminPanel.hidden = !isAdmin
  adminToggle.textContent = isAdmin ? '🛠' : '⚙'
})

const adminForm = document.getElementById('adminForm') as HTMLFormElement
adminForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const data = new FormData(adminForm)
  const product: Product = {
    id: Date.now(),
    club: String(data.get('club')),
    title: String(data.get('title')),
    price: String(data.get('price')),
    oldPrice: String(data.get('price')),
    badge: 'NEW',
    supplier: String(data.get('supplier')),
    date: new Date().toLocaleDateString(),
    tags: ['Admin', 'Club'],
    image:
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=700&q=80',
  }
  products.unshift(product)
  renderProducts()
  adminForm.reset()
})

const searchForm = document.getElementById('searchForm') as HTMLFormElement
searchForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const input = document.getElementById('searchInput') as HTMLInputElement
  alert(`Searching for: ${input.value || 'all shirts'}`)
})

const newsletterForm = document.getElementById('newsletterForm') as HTMLFormElement
newsletterForm.addEventListener('submit', (event) => {
  event.preventDefault()
  alert('Thanks for subscribing!')
  newsletterForm.reset()
})

document.getElementById('addAlert')?.addEventListener('click', () => {
  alert('Alert creator coming next: choose team, size, and budget.')
})
