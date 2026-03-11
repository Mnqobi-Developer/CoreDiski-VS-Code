import './style.css'

type Product = {
  id: number
  club: string
  title: string
  price: number
  oldPrice: number
  badge: string
  trusted?: boolean
  supplier: string
  date: string
  tags: string[]
  image: string
}

type AppPage = 'catalog' | 'checkout' | 'favorites' | 'cart' | 'account' | 'auth'
type AuthMode = 'signin' | 'register'

type CartItem = {
  productId: number
  size: string
  qty: number
}

const products: Product[] = [
  {
    id: 1,
    club: 'Benfica',
    title: '2024-25 Benfica Away Shirt',
    price: 29.99,
    oldPrice: 84.99,
    badge: '65% OFF',
    supplier: 'classicfootballshirt.co.uk',
    date: '1/22/2026',
    tags: ['Adidas', 'Club', '2024-25'],
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    club: 'Manchester City',
    title: 'Manchester City Home Jersey 2025/26',
    price: 50,
    oldPrice: 100,
    badge: '50% OFF',
    trusted: true,
    supplier: 'mancity.com',
    date: '1/7/2026',
    tags: ['PUMA', 'Club', '2025/26'],
    image:
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    club: 'FFF Womens Team',
    title: "FFF 2025/26 Stadium Goalkeeper Women's Nike Dri-FIT Football Replica",
    price: 1599.99,
    oldPrice: 2199.95,
    badge: '27% OFF',
    supplier: 'nike.com',
    date: '1/22/2026',
    tags: ['Nike', 'Club', '2025-26'],
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
  },
]

const currencyFor = (product: Product) => (product.price > 400 ? 'ZAR' : 'EUR')
const fmtMoney = (product: Product, value: number) => `${currencyFor(product)} ${value.toFixed(2)}`

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('App root not found')

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
          <button class="icon-btn active" id="homeButton" title="Home">⌂</button>
          <button class="icon-btn" id="searchButton" title="Search">⌕</button>
          <button class="icon-btn" id="cartButton" title="Cart">🛒 0</button>
          <button class="icon-btn" id="favoritesButton" title="Favorites">♡ 0</button>
          <button class="icon-btn" id="adminToggle" title="Admin">⚙</button>
        </nav>
      </div>
    </header>

    <main>
      <section id="catalogPage">
        <section class="hero container">
          <div class="hero-logo">CORE DISKI</div>
          <h1>Authentic Football Shirts</h1>
          <p>Discover rare, verified jerseys from every club and nation worldwide.<br/>Heritage. Authenticity. Passion.</p>
          <form class="search-shell" id="searchForm">
            <input id="searchInput" type="search" placeholder="Search teams, leagues, or players..." />
            <button type="submit">Search</button>
          </form>
        </section>

        <section class="deals container">
          <div class="section-head">
            <div>
              <h2>🔥 Official Deals</h2>
              <p>Verified discounts from official stores - Buy safely through CoreDiski</p>
            </div>
            <button class="ghost-btn" type="button">View All</button>
          </div>
          <div class="card-grid" id="dealGrid"></div>
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
      </section>

      <section class="checkout container" id="checkoutPage" hidden>
        <button class="back-link" id="backToDeals" type="button">← Back</button>
        <div class="checkout-heads">
          <h2>Product Selection</h2>
          <h2>Order Summary</h2>
        </div>
        <div class="checkout-grid">
          <article class="checkout-card">
            <h3 id="selectedClub">Manchester City</h3>
            <p id="selectedTitle">Manchester City Home Jersey 2025/26</p>
            <div class="size-row">
              <p class="size-label">Size</p>
              <button class="size-guide" id="openSizeGuide" type="button">Size guide</button>
            </div>
            <div class="sizes">
              <button class="size-btn active" data-size="S" type="button">S</button>
              <button class="size-btn" data-size="M" type="button">M</button>
              <button class="size-btn" data-size="L" type="button">L</button>
              <button class="size-btn" data-size="XL" type="button">XL</button>
            </div>
            <label class="form-label">Quantity</label>
            <select id="quantitySelect" class="input-like">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <div class="card-actions">
              <button class="small-btn" id="favoriteSelected" type="button">♡ Favorite</button>
              <button class="dark-btn" id="addSelectedToCart" type="button">＋ Add to Cart</button>
            </div>
            <p class="helper">You must be logged in to add items to cart or pay.</p>
          </article>
          <article class="checkout-card">
            <div class="summary-product">
              <img id="summaryImage" alt="Selected shirt" />
              <div>
                <h3 id="summaryClub">Manchester City</h3>
                <p id="summaryTitle">Manchester City Home Jersey 2025/26</p>
                <div class="chip-row" id="summaryTags"></div>
              </div>
            </div>
            <div class="promo" id="summaryPromo">🎉 50% OFF - Original: EUR 100.00</div>
            <div class="price-lines">
              <div><span>Deal Price</span><strong id="dealPrice">EUR 50.00</strong></div>
              <div><span>CoreDiski Service Fee (10%)</span><strong id="feePrice">EUR 5.00</strong></div>
              <div class="total"><span>Total</span><strong id="totalPrice">EUR 55.00</strong></div>
            </div>
            <button class="pay-btn" id="payButton" type="button">Pay EUR 55.00</button>
          </article>
        </div>
      </section>

      <section class="page-panel container" id="favoritesPage" hidden>
        <h2>My Favorites</h2>
        <p>Shirts you saved for later.</p>
        <div class="list-wrap" id="favoritesList"></div>
      </section>

      <section class="page-panel container" id="cartPage" hidden>
        <h2>My Cart</h2>
        <p>Review items before checkout.</p>
        <div class="list-wrap" id="cartList"></div>
      </section>

      <section class="page-panel container" id="accountPage" hidden>
        <h2>My Account</h2>
        <p>Manage login status, shipping details, and profile preferences.</p>
        <div class="account-grid">
          <article class="simple-card">
            <h3>Authentication</h3>
            <p id="accountStateText">You are currently signed out.</p>
            <button class="dark-btn" id="signOutButton" type="button">Sign Out</button>
          </article>
          <article class="simple-card">
            <h3>Saved Shipping Address</h3>
            <p>John Doe</p>
            <p>123 Main St, Johannesburg, 2000</p>
            <p>South Africa · +27 123 456 789</p>
          </article>
          <article class="simple-card">
            <h3>Preferences</h3>
            <p>Favorite clubs: Manchester City, Barcelona</p>
            <p>Alerts: Weekly price drops</p>
          </article>
        </div>
      </section>

      <section class="auth-page container" id="authPage" hidden>
        <div class="auth-card">
          <div class="auth-badge">CORE DISKI</div>
          <div id="signInView">
            <h2>Welcome Back</h2>
            <p>Sign in to access your collection</p>
            <form id="signInForm" class="auth-form">
              <label>Email Address</label>
              <input type="email" placeholder="your@email.com" required />
              <label>Password</label>
              <input type="password" placeholder="••••••••" required />
              <button class="auth-btn" type="submit">Sign In</button>
            </form>
            <p class="auth-linkline">Don't have an account? <button class="text-link" id="openRegister" type="button">Create Account</button></p>
          </div>
          <div id="registerView" hidden>
            <h2>Create Your Account</h2>
            <p>Join Core Diski to collect authentic shirts</p>
            <form id="registerForm" class="auth-form">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" required />
              <label>Email Address</label>
              <input type="email" placeholder="your@email.com" required />
              <label>Password</label>
              <input id="registerPassword" type="password" placeholder="••••••••" required minlength="8" />
              <div class="strength" id="passwordStrength"><span></span><span></span><span></span><span></span></div>
              <label class="checkline"><input type="checkbox" required /> I agree to the <strong>Terms & Conditions</strong></label>
              <button class="auth-btn" type="submit">Create Account</button>
            </form>
            <p class="auth-linkline">Already have an account? <button class="text-link" id="openSignIn" type="button">Sign In</button></p>
          </div>
          <div class="auth-footer-links">About Us <span>|</span> FAQs <span>|</span> Contact <span>|</span> Privacy Policy</div>
        </div>
      </section>
    </main>
  </div>

  <dialog id="sizeGuideDialog" class="size-dialog">
    <h3>Size Guide</h3>
    <p>Chest (cm): S 92-97 · M 98-103 · L 104-111 · XL 112-119</p>
    <p>Tip: For a relaxed fit, choose one size up.</p>
    <button id="closeSizeGuide" class="dark-btn" type="button">Close</button>
  </dialog>

  <dialog id="signInPromptDialog" class="prompt-dialog">
    <h3>Sign in required</h3>
    <p>Please sign in or create an account before adding items to your cart.</p>
    <div class="prompt-actions">
      <button id="closeSignInPrompt" class="small-btn" type="button">Not now</button>
      <button id="goToSignIn" class="dark-btn" type="button">Go to Sign In</button>
    </div>
  </dialog>
`

const dealGrid = document.getElementById('dealGrid') as HTMLElement
const homeButton = document.getElementById('homeButton') as HTMLButtonElement
const searchButton = document.getElementById('searchButton') as HTMLButtonElement
const cartButton = document.getElementById('cartButton') as HTMLButtonElement
const favoritesButton = document.getElementById('favoritesButton') as HTMLButtonElement
const adminToggle = document.getElementById('adminToggle') as HTMLButtonElement
const adminPanel = document.getElementById('adminPanel') as HTMLElement
const accountStateText = document.getElementById('accountStateText') as HTMLElement
const signOutButton = document.getElementById('signOutButton') as HTMLButtonElement
const topNav = document.querySelector('.top-nav') as HTMLElement

const pages: Record<AppPage, HTMLElement> = {
  catalog: document.getElementById('catalogPage') as HTMLElement,
  checkout: document.getElementById('checkoutPage') as HTMLElement,
  favorites: document.getElementById('favoritesPage') as HTMLElement,
  cart: document.getElementById('cartPage') as HTMLElement,
  account: document.getElementById('accountPage') as HTMLElement,
  auth: document.getElementById('authPage') as HTMLElement,
}

const favoritesList = document.getElementById('favoritesList') as HTMLElement
const cartList = document.getElementById('cartList') as HTMLElement
const signInPromptDialog = document.getElementById('signInPromptDialog') as HTMLDialogElement

let cartCount = 0
let favoriteCount = 0
let isLoggedIn = false
let isAdmin = false
let selectedProduct = products[1]
let selectedSize = 'S'
const favoriteIds = new Set<number>()
const cartItems: CartItem[] = []

const setAuthMode = (mode: AuthMode) => {
  ;(document.getElementById('signInView') as HTMLElement).hidden = mode !== 'signin'
  ;(document.getElementById('registerView') as HTMLElement).hidden = mode !== 'register'
}

const showPage = (page: AppPage) => {
  Object.values(pages).forEach((section) => {
    section.hidden = true
  })
  pages[page].hidden = false

  topNav.hidden = page === 'auth'
  document.body.classList.toggle('auth-route', page === 'auth')
  window.history.replaceState(null, '', `#/${page}`)

  document.querySelectorAll('.icon-btn').forEach((button) => button.classList.remove('active'))
  if (page === 'catalog' || page === 'checkout') homeButton.classList.add('active')
  if (page === 'favorites') favoritesButton.classList.add('active')
  if (page === 'cart') cartButton.classList.add('active')

  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const updateIconCounters = () => {
  cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0)
  favoriteCount = favoriteIds.size
  cartButton.textContent = `🛒 ${cartCount}`
  favoritesButton.textContent = `♡ ${favoriteCount}`
}

const renderFavorites = () => {
  const entries = products.filter((product) => favoriteIds.has(product.id))
  if (entries.length === 0) {
    favoritesList.innerHTML = '<p class="empty-copy">No favorites yet. Save shirts to see them here.</p>'
    return
  }

  favoritesList.innerHTML = entries
    .map(
      (product) => `
      <article class="list-item">
        <img src="${product.image}" alt="${product.club}" />
        <div>
          <h3>${product.club}</h3>
          <p>${product.title}</p>
          <p><strong>${fmtMoney(product, product.price)}</strong></p>
        </div>
        <div class="list-actions">
          <button class="small-btn remove-favorite" data-id="${product.id}" type="button">Remove</button>
          <button class="small-btn select-product" data-id="${product.id}" type="button">View</button>
        </div>
      </article>
    `,
    )
    .join('')
}

const renderCart = () => {
  if (cartItems.length === 0) {
    cartList.innerHTML = '<p class="empty-copy">Your cart is empty. Add shirts from deals or checkout.</p>'
    return
  }

  const lines = cartItems
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId)
      if (!product) return ''
      const lineTotal = product.price * item.qty
      return `
        <article class="list-item">
          <img src="${product.image}" alt="${product.club}" />
          <div>
            <h3>${product.club}</h3>
            <p>${product.title}</p>
            <p>Size: ${item.size} · Qty: ${item.qty}</p>
            <p><strong>${fmtMoney(product, lineTotal)}</strong></p>
          </div>
          <div class="list-actions">
            <button class="small-btn remove-cart" data-id="${product.id}" type="button">Remove</button>
          </div>
        </article>
      `
    })
    .join('')

  cartList.innerHTML = `${lines}<div class="cart-total">Cart total items: ${cartCount}</div>`
}

const renderSummary = () => {
  const qty = Number((document.getElementById('quantitySelect') as HTMLSelectElement).value)
  const deal = selectedProduct.price * qty
  const fee = deal * 0.1
  const total = deal + fee

  ;(document.getElementById('selectedClub') as HTMLElement).textContent = selectedProduct.club
  ;(document.getElementById('selectedTitle') as HTMLElement).textContent = selectedProduct.title
  ;(document.getElementById('summaryClub') as HTMLElement).textContent = selectedProduct.club
  ;(document.getElementById('summaryTitle') as HTMLElement).textContent = selectedProduct.title
  ;(document.getElementById('summaryImage') as HTMLImageElement).src = selectedProduct.image
  ;(document.getElementById('summaryPromo') as HTMLElement).textContent = `🎉 ${selectedProduct.badge} - Original: ${fmtMoney(selectedProduct, selectedProduct.oldPrice)}`
  ;(document.getElementById('dealPrice') as HTMLElement).textContent = fmtMoney(selectedProduct, deal)
  ;(document.getElementById('feePrice') as HTMLElement).textContent = fmtMoney(selectedProduct, fee)
  ;(document.getElementById('totalPrice') as HTMLElement).textContent = fmtMoney(selectedProduct, total)
  ;(document.getElementById('payButton') as HTMLElement).textContent = `Pay ${fmtMoney(selectedProduct, total)}`
  ;(document.getElementById('summaryTags') as HTMLElement).innerHTML = `${selectedProduct.tags
    .slice(0, 2)
    .map((tag) => `<span>${tag}</span>`)
    .join('')}<span>${selectedSize}</span>`
}

const renderProducts = () => {
  dealGrid.innerHTML = products
    .map(
      (product) => `
      <article class="deal-card" data-id="${product.id}">
        <div class="deal-image" style="background-image:url('${product.image}')">
          ${product.trusted ? '<span class="pill verified">Verified</span>' : ''}
          <span class="pill">${product.badge}</span>
        </div>
        <h3>${product.club}</h3>
        <p class="item-title">${product.title}</p>
        <div class="chip-row">${product.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
        <p class="price">${fmtMoney(product, product.price)}</p>
        <p class="old-price">${fmtMoney(product, product.oldPrice)}</p>
        <p class="meta">Detected: ${product.date}</p>
        <p class="meta">Official: ${product.supplier}</p>
        <div class="card-actions">
          <button class="small-btn favorite" data-id="${product.id}" type="button">♡ Favorite</button>
          <button class="small-btn select-product" data-id="${product.id}" type="button">Select Shirt</button>
        </div>
      </article>
    `,
    )
    .join('')
}

const addProductToCart = (productId: number, size: string, qty: number) => {
  const existing = cartItems.find((item) => item.productId === productId && item.size === size)
  if (existing) {
    existing.qty += qty
  } else {
    cartItems.push({ productId, size, qty })
  }
  updateIconCounters()
  renderCart()
}

renderProducts()
renderSummary()
renderFavorites()
renderCart()
updateIconCounters()
setAuthMode('signin')

if (window.location.hash === '#/auth') {
  showPage('auth')
<<<<<<< codex/pull-latest-changes-from-repository-p04n5r
} else {
  showPage('catalog')
=======
>>>>>>> master
}

homeButton.addEventListener('click', () => showPage('catalog'))
searchButton.addEventListener('click', () => showPage('catalog'))
favoritesButton.addEventListener('click', () => {
  renderFavorites()
  showPage('favorites')
})
cartButton.addEventListener('click', () => {
  renderCart()
  showPage('cart')
})
document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement

  if (target.classList.contains('favorite')) {
    const id = Number(target.getAttribute('data-id'))
    favoriteIds.add(id)
    updateIconCounters()
    renderFavorites()
  }

  if (target.classList.contains('remove-favorite')) {
    const id = Number(target.getAttribute('data-id'))
    favoriteIds.delete(id)
    updateIconCounters()
    renderFavorites()
  }

  if (target.classList.contains('select-product')) {
    const id = Number(target.getAttribute('data-id'))
    const found = products.find((product) => product.id === id)
    if (!found) return
    selectedProduct = found
    renderSummary()
    showPage('checkout')
  }

  if (target.classList.contains('size-btn')) {
    const sizeButtons = document.querySelectorAll<HTMLButtonElement>('.size-btn')
    sizeButtons.forEach((button) => button.classList.remove('active'))
    target.classList.add('active')
    selectedSize = target.getAttribute('data-size') || 'S'
    renderSummary()
  }

  if (target.classList.contains('remove-cart')) {
    const productId = Number(target.getAttribute('data-id'))
    const index = cartItems.findIndex((item) => item.productId === productId)
    if (index >= 0) cartItems.splice(index, 1)
    updateIconCounters()
    renderCart()
  }
})

adminToggle.addEventListener('click', () => {
  if (!isLoggedIn) {
    setAuthMode('signin')
    showPage('auth')
    return
  }
  isAdmin = !isAdmin
  adminPanel.hidden = !isAdmin
  adminToggle.textContent = isAdmin ? '🛠' : '⚙'
  showPage('catalog')
})

signOutButton.addEventListener('click', () => {
  isLoggedIn = false
  accountStateText.textContent = 'You are currently signed out.'
  showPage('auth')
})

;(document.getElementById('openRegister') as HTMLButtonElement).addEventListener('click', () => {
  setAuthMode('register')
})

;(document.getElementById('openSignIn') as HTMLButtonElement).addEventListener('click', () => {
  setAuthMode('signin')
})

;(document.getElementById('signInForm') as HTMLFormElement).addEventListener('submit', (event) => {
  event.preventDefault()
  isLoggedIn = true
  accountStateText.textContent = 'You are signed in and can checkout.'
  showPage('account')
})

;(document.getElementById('registerForm') as HTMLFormElement).addEventListener('submit', (event) => {
  event.preventDefault()
  isLoggedIn = true
  accountStateText.textContent = 'You are signed in and can checkout.'
  showPage('account')
})

const registerPassword = document.getElementById('registerPassword') as HTMLInputElement
registerPassword.addEventListener('input', () => {
  const checks = [registerPassword.value.length >= 8, /\d/.test(registerPassword.value), /[A-Z]/.test(registerPassword.value)]
  const score = checks.filter(Boolean).length
  document.querySelectorAll('#passwordStrength span').forEach((bar, i) => {
    const item = bar as HTMLElement
    item.classList.toggle('active', i < score + 1)
  })
})

;(document.getElementById('favoriteSelected') as HTMLButtonElement).addEventListener('click', () => {
  favoriteIds.add(selectedProduct.id)
  updateIconCounters()
  renderFavorites()
})

;(document.getElementById('quantitySelect') as HTMLSelectElement).addEventListener('change', () => {
  renderSummary()
})

;(document.getElementById('addSelectedToCart') as HTMLButtonElement).addEventListener('click', () => {
  if (!isLoggedIn) {
    signInPromptDialog.showModal()
    return
  }

  const qty = Number((document.getElementById('quantitySelect') as HTMLSelectElement).value)
  addProductToCart(selectedProduct.id, selectedSize, qty)
  alert(`Added ${selectedProduct.club} (${selectedSize}) to cart.`)
})

;(document.getElementById('payButton') as HTMLButtonElement).addEventListener('click', () => {
  if (!isLoggedIn) {
    setAuthMode('signin')
    showPage('auth')
    return
  }
  showPage('cart')
})

;(document.getElementById('backToDeals') as HTMLButtonElement).addEventListener('click', () => {
  showPage('catalog')
})

const searchForm = document.getElementById('searchForm') as HTMLFormElement
searchForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const input = document.getElementById('searchInput') as HTMLInputElement
  alert(`Searching for: ${input.value || 'all shirts'}`)
})

const adminForm = document.getElementById('adminForm') as HTMLFormElement
adminForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const data = new FormData(adminForm)
  const priceField = String(data.get('price')).replace(/[^\d.]/g, '')
  const product: Product = {
    id: Date.now(),
    club: String(data.get('club')),
    title: String(data.get('title')),
    price: Number(priceField || '0'),
    oldPrice: Number(priceField || '0') * 1.25,
    badge: 'NEW',
    supplier: String(data.get('supplier')),
    date: new Date().toLocaleDateString(),
    tags: ['Admin', 'Club'],
    image:
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80',
  }
  products.unshift(product)
  renderProducts()
  adminForm.reset()
})

const sizeGuideDialog = document.getElementById('sizeGuideDialog') as HTMLDialogElement
;(document.getElementById('openSizeGuide') as HTMLButtonElement).addEventListener('click', () => {
  sizeGuideDialog.showModal()
})
;(document.getElementById('closeSizeGuide') as HTMLButtonElement).addEventListener('click', () => {
  sizeGuideDialog.close()
})


;(document.getElementById('closeSignInPrompt') as HTMLButtonElement).addEventListener('click', () => {
  signInPromptDialog.close()
})

;(document.getElementById('goToSignIn') as HTMLButtonElement).addEventListener('click', () => {
  signInPromptDialog.close()
  setAuthMode('signin')
  showPage('auth')
})
