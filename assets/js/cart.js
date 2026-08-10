/* Yaiya — cart state, persisted in localStorage. Front-end demo only. */

const CART_KEY = "yaiya_cart_v1";

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function writeCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  document.dispatchEvent(new CustomEvent("cart:change", { detail: items }));
}

function cartCount() {
  return readCart().reduce((n, i) => n + i.qty, 0);
}

function cartSubtotal() {
  return readCart().reduce((sum, i) => {
    const p = getProduct(i.id);
    return sum + (p ? p.price * i.qty : 0);
  }, 0);
}

function addToCart(id, qty = 1) {
  const items = readCart();
  const found = items.find((i) => i.id === id);
  if (found) found.qty += qty;
  else items.push({ id, qty });
  writeCart(items);
  flashCart();
}

function setQty(id, qty) {
  let items = readCart();
  if (qty <= 0) {
    items = items.filter((i) => i.id !== id);
  } else {
    const found = items.find((i) => i.id === id);
    if (found) found.qty = qty;
  }
  writeCart(items);
}

function removeFromCart(id) {
  writeCart(readCart().filter((i) => i.id !== id));
}

function clearCart() {
  writeCart([]);
}

/* badge updates + brief pulse when items are added */
function syncCartBadges() {
  const n = cartCount();
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = n;
    el.hidden = n === 0;
  });
}

function flashCart() {
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.classList.remove("pulse");
    void el.offsetWidth; // restart animation
    el.classList.add("pulse");
  });

  const t = document.getElementById("toast");
  if (t) {
    t.textContent = "เพิ่มลงตะกร้าแล้ว / Added to your basket";
    t.classList.add("show");
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove("show"), 2600);
  }
}

document.addEventListener("cart:change", syncCartBadges);
document.addEventListener("DOMContentLoaded", syncCartBadges);
