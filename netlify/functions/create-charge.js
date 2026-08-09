/* Yaiya — card payment charge endpoint (STUB — no processor wired in yet).

   Once deployed, this is reachable at:  /.netlify/functions/create-charge
   (Netlify auto-detects functions in this folder; see netlify.toml at the repo root,
   which is what tells Netlify to look here in the first place.)

   This function does NOT charge anything yet. It exists so the plumbing — the request
   shape, the response shape, where secrets live — is already in place before you sign up
   with a processor. To go live:

     1. Sign up with a payment processor. For Thailand + PromptPay + cards, Omise (Opn
        Payments) or 2C2P are the usual choices; Stripe if you only need international
        cards (no native PromptPay).
     2. Add its SECRET key as a Netlify environment variable — Site configuration →
        Environment variables (e.g. OMISE_SECRET_KEY). NEVER put a secret key in frontend
        JS or commit it to the repo; only this server-side function should ever see it.
     3. On the frontend, use the processor's own hosted card element (Stripe Elements,
        Omise.js, etc.) so the raw card number goes straight from the customer's browser to
        the processor and becomes a one-time token — it should never appear in the JSON
        body this function receives.
     4. Replace the body of `handler` below with a real call to that processor's
        server-side SDK/API, passing the token + amount, using the env var from step 2.
     5. Return the shape assets/js/payment-service.js already expects:
          success → { statusCode: 200, body: JSON.stringify({ ok: true, chargeId, status }) }
          failure → { statusCode: 4xx/5xx, body: JSON.stringify({ ok: false, error }) }
     6. Re-enable the "Credit / debit card" option in checkout.html's payment <select>
        (currently commented out — search for "Re-add as") and wire payment-service.js's
        chargeCard() into the submit handler there. */

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ ok: false, error: "Method not allowed" }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: "Invalid JSON body" }) };
  }

  const { token, amount, currency, orderNo } = payload;
  if (!token || !amount) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: "Missing token or amount" }) };
  }

  // NOTE: no processor is configured yet — fail clearly instead of pretending to succeed,
  // so nobody accidentally ships a "working" card option that doesn't actually charge anyone.
  return {
    statusCode: 501,
    body: JSON.stringify({
      ok: false,
      error: "Card payments aren't configured yet — see the setup steps at the top of netlify/functions/create-charge.js",
      received: { orderNo, amount, currency }
    })
  };
};
