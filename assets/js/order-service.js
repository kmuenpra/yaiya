/* Yaiya — order submission service.
   The checkout page calls only `submitOrder(order)` below. It has no idea which
   backend is behind it. To move off Netlify Forms later (e.g. to your own API,
   Supabase, a payment provider's order endpoint, …):
     1. Add a new adapter to ORDER_ADAPTERS with a `submit(order)` method that
        returns a Promise (resolve on success, throw/reject on failure).
     2. Point ACTIVE_ADAPTER at its key.
   Nothing in checkout.html needs to change. */

const ACTIVE_ADAPTER = "netlify";

const ORDER_ADAPTERS = {
  /* Netlify Forms: a static, hidden copy of this form lives in checkout.html so
     Netlify's build-time crawler registers it — Netlify Forms cannot detect a
     form that only exists after JS renders it. This adapter just POSTs the same
     field set to "/", which Netlify intercepts and stores (visible under
     Site settings → Forms in the Netlify dashboard). Submissions only land
     once the site is actually deployed on Netlify — a local dev server will
     404, which is expected. */
  netlify: {
    async submit(order) {
      const fields = {
        "form-name": "order",
        "order-no": order.orderNo,
        "first-name": order.contact.firstName,
        "last-name": order.contact.lastName,
        email: order.contact.email,
        phone: order.contact.phone,
        address: order.shipping.address,
        city: order.shipping.city,
        zip: order.shipping.zip,
        province: order.shipping.province,
        "payment-method": order.payment.method,
        subtotal: order.totals.subtotal,
        shipping: order.totals.shipping,
        total: order.totals.total,
        items: JSON.stringify(order.items),
        "order-json": JSON.stringify(order)
      };
      const body = new URLSearchParams(fields).toString();
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body
      });
      if (!res.ok) throw new Error(`Netlify Forms submission failed (${res.status})`);
      return { ok: true, adapter: "netlify" };
    }
  }

  /* Example shape for a future custom backend:
  custom: {
    async submit(order) {
      const res = await fetch("https://api.example.com/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
      });
      if (!res.ok) throw new Error(`Order API failed (${res.status})`);
      return { ok: true, adapter: "custom" };
    }
  }
  */
};

async function submitOrder(order) {
  const adapter = ORDER_ADAPTERS[ACTIVE_ADAPTER];
  if (!adapter) throw new Error(`Unknown order adapter: ${ACTIVE_ADAPTER}`);
  return adapter.submit(order);
}
