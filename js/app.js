import { products } from "./data.js";
import { routeFromHash } from "./router.js";

const reviews = [
  { name: "Arjun M.", role: "Software engineer", rating: 5, text: "The field notes set changed how I plan my day. Simple, well-made, and the quality is obvious the moment you hold it." },
  { name: "Sneha R.", role: "Design student", rating: 5, text: "Finally a desk lamp that does not look out of place in my room. Warm light, solid build. Use it for hours without eye strain." },
  { name: "Vikram P.", role: "Freelance writer", rating: 4, text: "Bought the trail mug and tote together. Everything feels considered. My workspace finally feels like mine." },
];

const productRatings = {
  "field-notes": { stars: 4.9, sold: 842 },
  "arc-lamp": { stars: 4.8, sold: 613 },
  "trail-mug": { stars: 4.9, sold: 1204 },
  "utility-tote": { stars: 4.7, sold: 489 },
};

const app = document.getElementById("app");
const count = document.getElementById("cart-count");
const storageKey = "orbit-supply-cart";
let cart = loadCart();

function loadCart() {
  try { return JSON.parse(localStorage.getItem(storageKey)) || {}; } catch { return {}; }
}
function saveCart() { localStorage.setItem(storageKey, JSON.stringify(cart)); }
function cartItems() { return products.filter((product) => cart[product.id]).map((product) => ({ ...product, quantity: cart[product.id] })); }
function formatMoney(value) { return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value * 83); }
function updateCount() { count.textContent = Object.values(cart).reduce((total, quantity) => total + quantity, 0); }
function productCard(product) {
  const info = productRatings[product.id] || { stars: 4.8, sold: 0 };
  const stars = renderStars(info.stars);
  const stock = product.id === "trail-mug" ? 3 : product.id === "arc-lamp" ? 5 : 12;
  return `<article class="product-card">
    <span class="stock-badge ${stock <= 5 ? "is-low" : ""}">${stock <= 5 ? `Only ${stock} left` : "In stock"}</span>
    <img src="${product.image}" width="320" height="260" alt="${product.name}" loading="lazy" />
    <div class="product-copy">
      <p class="product-category">${product.category}</p>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="rating-row"><span class="stars" aria-label="${info.stars} out of 5 stars">${stars}</span><span class="rating-value">${info.stars}</span><span class="sold-count">${info.sold.toLocaleString()}+ sold</span></div>
      <div class="product-action"><strong>${formatMoney(product.price)}</strong></div>
      <button type="button" data-add="${product.id}">Add to cart</button>
    </div>
  </article>`;
}
function renderStars(value) {
  let out = "";
  for (let i = 1; i <= 5; i++) {
    out += i <= Math.floor(value) ? "★" : i - value < 1 ? "⯪" : "☆";
  }
  return out;
}
function homeView() {
  return `<section class="hero">
    <div class="hero-content">
      <p class="kicker">Designed for the daily reset</p>
      <h1>Useful objects.<br>Fewer distractions.</h1>
      <p class="hero-sub">Orbit Supply is a small catalog of practical tools for your desk and daily carry — built to help you focus on what matters.</p>
      <div class="hero-actions">
        <a class="primary-link" href="#/shop">Browse the collection</a>
        <a class="ghost-link" href="#/shop">See what's new</a>
      </div>
      <div class="trust-badges">
        <span>Free shipping</span><span class="dot">•</span><span>30-day returns</span><span class="dot">•</span><span>2,400+ happy customers</span>
      </div>
    </div>
    <div class="hero-showcase" aria-hidden="true">
      ${products.slice(0, 3).map((product, i) => `<img class="showcase-img showcase-${i + 1}" src="${product.image}" alt="" width="180" height="150" />`).join("")}
    </div>
  </section>
  <section class="value-props">
    <div class="prop"><span class="prop-icon">◆</span><div><h3>Built to last</h3><p>Quality materials and simple forms that age well.</p></div></div>
    <div class="prop"><span class="prop-icon">◆</span><div><h3>Thoughtfully curated</h3><p>Just the essentials — nothing you will not use.</p></div></div>
    <div class="prop"><span class="prop-icon">◆</span><div><h3>Demo-friendly</h3><p>A real cart experience with local checkout.</p></div></div>
  </section>
  <section class="section-heading"><p class="kicker">Featured objects</p><h2>Start with the essentials.</h2></section>
  <section class="product-grid">${products.slice(0, 3).map(productCard).join("")}</section>
  <section class="testimonials">
    <p class="kicker">What people are saying</p>
    <h2>Loved by focused workers.</h2>
    <div class="review-grid">${reviews.map((r) => `<article class="review-card"><div class="review-stars">${renderStars(r.rating)}</div><p class="review-text">"${r.text}"</p><div class="review-author"><div class="avatar">${r.name.charAt(0)}</div><div><strong>${r.name}</strong><span>${r.role}</span></div></div></article>`).join("")}</div>
  </section>
  <section class="faq">
    <p class="kicker">Questions</p>
    <h2>Everything you need to know.</h2>
    <div class="faq-list">
      <details class="faq-item"><summary>Is this a real store?</summary><p>Orbit Supply is a catalog demo. You can browse, add items to your cart, and experience the full flow — but no real payments are processed.</p></details>
      <details class="faq-item"><summary>Do you ship internationally?</summary><p>Since this is a demo, there is no real shipping. In a full version, we would ship across India with free delivery on every order.</p></details>
      <details class="faq-item"><summary>What is your return policy?</summary><p>Every order comes with a 30-day hassle-free return. If it is not right for your space, send it back — no questions asked.</p></details>
      <details class="faq-item"><summary>How long does delivery take?</summary><p>Standard delivery takes 3–5 business days across India. Express options would be available at checkout in a full version.</p></details>
    </div>
  </section>
  <section class="final-cta">
    <h2>Ready to reset your workspace?</h2>
    <p>Browse the full collection and find the objects that help you focus.</p>
    <a class="primary-link" href="#/shop">Shop the collection</a>
  </section>`;
}
function shopView() {
  return `<section class="page-heading"><p class="kicker">The collection</p><h1>Everyday tools, pared back.</h1><p>Four considered objects for a calmer workday.</p></section><section class="product-grid">${products.map(productCard).join("")}</section>`;
}
function cartView() {
  const items = cartItems();
  if (!items.length) return `<section class="empty-cart"><p class="kicker">Your cart</p><h1>Nothing here yet.</h1><p>Add an object from the catalog when something catches your eye.</p><a class="primary-link" href="#/shop">Visit the shop</a></section>`;
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return `<section class="cart-layout"><div><p class="kicker">Your cart</p><h1>Ready when you are.</h1><div class="cart-list">${items.map((item) => `<article class="cart-item"><img src="${item.image}" width="96" height="78" alt="" /><div><h2>${item.name}</h2><p>${formatMoney(item.price)}</p></div><div class="quantity" aria-label="Quantity controls for ${item.name}"><button type="button" data-quantity="${item.id}" data-change="-1" aria-label="Reduce ${item.name} quantity">-</button><span>${item.quantity}</span><button type="button" data-quantity="${item.id}" data-change="1" aria-label="Increase ${item.name} quantity">+</button></div><button class="remove" type="button" data-remove="${item.id}">Remove</button></article>`).join("")}</div></div>
  <aside class="order-summary"><p>Order summary</p><div><span>Items</span><strong>${formatMoney(total)}</strong></div><div><span>Shipping</span><strong>Calculated later</strong></div><div class="order-total"><span>Total</span><strong>${formatMoney(total)}</strong></div><button type="button" data-checkout>Continue to checkout</button></aside></section>`;
}
function render() {
  const route = routeFromHash();
  app.innerHTML = route === "/shop" ? shopView() : route === "/cart" ? cartView() : homeView();
  document.querySelectorAll("nav a").forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${route}`));
  updateCount();
}
function addProduct(id) { cart[id] = (cart[id] || 0) + 1; saveCart(); updateCount(); }
app.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.add) { addProduct(button.dataset.add); button.textContent = "Added"; setTimeout(() => { button.textContent = "Add to cart"; }, 900); }
  if (button.dataset.quantity) { const id = button.dataset.quantity; cart[id] += Number(button.dataset.change); if (cart[id] < 1) delete cart[id]; saveCart(); render(); }
  if (button.dataset.remove) { delete cart[button.dataset.remove]; saveCart(); render(); }
  if (button.hasAttribute("data-checkout")) { window.alert("This catalog demo does not process payments."); }
});
window.addEventListener("hashchange", render);
render();
