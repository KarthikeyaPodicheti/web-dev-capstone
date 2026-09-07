# Web Development Capstone: Orbit Supply — P Karthikeya

Hi, I'm **P Karthikeya**, a front-end web development student at Methodist College of Engineering & Technology, Hyderabad. This is my capstone project for the final task of my web development internship. I built **Orbit Supply**, a responsive e-commerce product catalog that combines everything I learned in the earlier tasks — semantic HTML, CSS layout, and vanilla JavaScript — into one production-ready application.

🌐 **Live on Vercel:** [https://web-dev-capstone-lovat.vercel.app](https://web-dev-capstone-lovat.vercel.app) · Repo: [`web-dev-capstone`](https://github.com/KarthikeyaPodicheti/web-dev-capstone)

## How I Made This Capstone

### 1. I architected a modular frontend
Instead of one big script, I split the logic into small focused modules:
- `js/data.js` — holds the product catalog (id, name, category, price, description, image)
- `js/router.js` — turns the current URL hash into a route and exposes a `navigate` helper
- `js/app.js` — imports the data and router, renders whichever view matches the route, and manages the cart state

Using ES modules kept each file small with a single job, so the app is easy to read and extend.

### 2. I implemented client-side routing
I built a hash-based router with three routes — `#/` (Home), `#/shop` (Shop), and `#/cart` (Cart). The navigation links point to hashes, and a `hashchange` listener re-renders the view. Moving through the catalog never triggers a full page reload: the shell (`index.html`) stays put and only the `<main>` content swaps. The active nav link is highlighted, and an unknown hash falls back to the home view.

### 3. I optimized the assets
I created the product artwork as small local SVGs (under 500 bytes each) instead of loading large external images, which keeps the project lightweight and self-contained. Images are lazy-loaded, prices are formatted with `Intl.NumberFormat`, and the CSS lives in one minification-friendly file. The layout uses responsive CSS Grid so the catalog reads well from mobile up to desktop.

### 4. I built a persistent cart
Cart quantities are stored in `localStorage`, so a refresh keeps your selections. The cart supports adding items, increasing and decreasing quantities, removing items, and a running order total — all updated in place through delegated event listeners on the app container. A live count badge in the nav reflects how many items you've added.

### 5. I deployed it live on Vercel
I deployed the project to **Vercel** — the modern platform the task asked for — and connected it to the GitHub repository, with the production URL set as the project homepage. Because the repo is linked, every push to `main` redeploys automatically, so the live URL always reflects the latest code.

### 6. I verified the app works
I tested the deployed site end to end:
- Clicking from Home to Shop and Cart changes the route without a reload
- Adding items updates the cart count and populates the cart view
- Quantity controls, removal, and the order total all behave correctly
- Reloading the page keeps the cart contents (localStorage persistence)

## The Views

- **Home** — introduces the brand and shows a few featured objects
- **Shop** — lists the full catalog with an *Add to cart* button on each product
- **Cart** — shows chosen items with quantity controls, remove buttons, a live item count, and an order total. The checkout button is clearly marked as demo mode because the project does not process payments.

## Project Structure

- `index.html` — the shared application shell (header, nav, main container, footer)
- `js/data.js` — the product catalog
- `js/router.js` — client-side hash routing
- `js/app.js` — view rendering and cart state management
- `assets/` — optimized SVG product illustrations
- `style.css` — responsive styles and the theme tokens

## How to Run It

Just open `index.html` in any modern browser — no build step or dependencies required.

## Contact Me

- Email: [karthikeypodicheti25@gmail.com](mailto:karthikeypodicheti25@gmail.com)
- GitHub: [KarthikeyaPodicheti](https://github.com/KarthikeyaPodicheti)
