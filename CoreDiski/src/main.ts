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
          <button class="ghost-btn">View All</button>
        </div>
        <div class="card-grid" id="dealGrid"></div>
      </section>

      <section class="checkout container" id="checkoutSection">
        <button class="back-link" id="backToDeals">← Back</button>
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
            <div class="sizes" id="sizeButtons">
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

            <button class="dark-btn full" id="addSelectedToCart">＋ Add to Cart</button>
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

            <div class="source">🛡 Sourced from: <span id="summarySupplier">mancity.com</span></div>
            <ul class="benefits">
              <li>Authenticity Verified</li>
              <li>Secure Payment Processing</li>
              <li>Buyer Protection Included</li>
            </ul>

            <button class="pay-btn" id="payButton">Pay EUR 55.00</button>
          </article>
        </div>
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
  </div>

  <dialog id="sizeGuideDialog" class="size-dialog">
    <h3>Size Guide</h3>
    <p>Chest (cm): S 92-97 · M 98-103 · L 104-111 · XL 112-119</p>
    <p>Tip: For a relaxed fit, choose one size up.</p>
    <button id="closeSizeGuide" class="dark-btn" type="button">Close</button>
  </dialog>
`

const dealGrid = document.getElementById('dealGrid')
const favoritesButton = document.getElementById('favoritesButton') as HTMLButtonElement
const cartButton = document.getElementById('cartButton') as HTMLButtonElement
const authToggle = document.getElementById('authToggle') as HTMLButtonElement
const adminToggle = document.getElementById('adminToggle') as HTMLButtonElement
const adminPanel = document.getElementById('adminPanel') as HTMLElement
const checkoutSection = document.getElementById('checkoutSection') as HTMLElement

let cartCount = 0
let favoriteCount = 0
let isLoggedIn = false
let isAdmin = false
let selectedProduct = products[1]
let selectedSize = 'S'

const updateIconCounters = () => {
  cartButton.textContent = `🛒 ${cartCount}`
  favoritesButton.textContent = `♡ ${favoriteCount}`
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
  ;(document.getElementById('summarySupplier') as HTMLElement).textContent = selectedProduct.supplier
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
  if (!dealGrid) return
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
          <button class="small-btn favorite" type="button">♡ Favorite</button>
          <button class="small-btn select-product" data-id="${product.id}" type="button">Select Shirt</button>
        </div>
      </article>
    `,
    )
    .join('')
}

renderProducts()
updateIconCounters()
renderSummary()

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement

  if (target.classList.contains('favorite')) {
    favoriteCount += 1
    updateIconCounters()
  }

  if (target.classList.contains('select-product')) {
    const id = Number(target.getAttribute('data-id'))
    const found = products.find((product) => product.id === id)
    if (!found) return
    selectedProduct = found
    renderSummary()
    checkoutSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (target.classList.contains('size-btn')) {
    const sizeButtons = document.querySelectorAll<HTMLButtonElement>('.size-btn')
    sizeButtons.forEach((button) => button.classList.remove('active'))
    target.classList.add('active')
    selectedSize = target.getAttribute('data-size') || 'S'
    renderSummary()
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

;(document.getElementById('quantitySelect') as HTMLSelectElement).addEventListener('change', () => {
  renderSummary()
})

;(document.getElementById('addSelectedToCart') as HTMLButtonElement).addEventListener('click', () => {
  if (!isLoggedIn) {
    alert('Please log in or register before adding to cart.')
    return
  }
  cartCount += Number((document.getElementById('quantitySelect') as HTMLSelectElement).value)
  updateIconCounters()
  alert(`Added ${selectedProduct.club} (${selectedSize}) to cart.`)
})

;(document.getElementById('payButton') as HTMLButtonElement).addEventListener('click', () => {
  if (!isLoggedIn) {
    alert('Please log in or register before checkout.')
    return
  }
  alert('Payment flow initiated.')
})

;(document.getElementById('backToDeals') as HTMLButtonElement).addEventListener('click', () => {
  document.querySelector('.deals')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
