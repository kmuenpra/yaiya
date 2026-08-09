/* Yaiya — card payment service (STUB — not wired into checkout.html yet).
   Mirrors the adapter pattern in order-service.js: once activated, checkout.html would
   call only `chargeCard(details)` below, without knowing which processor is behind it.

   Currently unused. The "Credit / debit card" option is still commented out in
   checkout.html's payment <select>. To activate:
     1. Configure a real processor behind netlify/functions/create-charge.js (see the
        setup steps at the top of that file).
     2. On the frontend, use that processor's hosted card element (Stripe Elements,
        Omise.js, etc.) to turn the card into a one-time `token` in the browser — the raw
        card number should never be handled by this file or by create-charge.js directly.
     3. Uncomment <option value="card"> in checkout.html, and in its submit handler, when
        form.pay.value === "card": call chargeCard({ token, amount: order.totals.total,
        order }) and only proceed to submitOrder()/confirmOrder() if it resolves. On
        rejection, show the error and let the shopper retry — unlike order capture, a
        failed charge should block checkout, not silently continue. */

const ACTIVE_PAYMENT_ADAPTER = "netlify-function";

const PAYMENT_ADAPTERS = {
  /* Calls our own Netlify Function, which calls whichever processor is configured
     server-side. Only ever send a one-time token here — never a raw card number. */
  "netlify-function": {
    async charge({ token, amount, currency = "THB", order }) {
      const res = await fetch("/.netlify/functions/create-charge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, amount, currency, orderNo: order && order.orderNo })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || `Charge failed (${res.status})`);
      return data;
    }
  }

  /* Example shape for calling a processor directly from the client (no Netlify Function),
     if that processor's SDK supports it — still never send a raw card number, only a token:
  "processor-direct": {
    async charge({ token, amount, currency, order }) {
      ...
    }
  }
  */
};

async function chargeCard(details) {
  const adapter = PAYMENT_ADAPTERS[ACTIVE_PAYMENT_ADAPTER];
  if (!adapter) throw new Error(`Unknown payment adapter: ${ACTIVE_PAYMENT_ADAPTER}`);
  return adapter.charge(details);
}
