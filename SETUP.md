# Paywall Setup Guide — Alderney Week 2026

Follow these steps once to get the paywall live. It takes about 30–45 minutes.

---

## What you need to create accounts for (all free)

| Service | What it does | Cost |
|---|---|---|
| **Netlify** | Hosts the website & runs the backend functions | Free |
| **Stripe** | Takes the £3 payment | 1.5% + 20p per transaction |
| **Resend** | Sends the access emails | Free up to 3,000 emails/month |

---

## Step 1 — Create a Netlify account and deploy the site

1. Go to **https://netlify.com** and sign up (free)
2. Click **Add new site → Deploy manually**
3. Drag the entire `Alderney Week` folder onto the upload area
4. Your site will get a URL like `https://alderney-week-abc123.netlify.app`
5. (Optional) Go to **Domain settings** to connect your real domain

---

## Step 2 — Get your Stripe keys

1. Go to **https://stripe.com** and sign up
2. In the dashboard, go to **Developers → API keys**
3. Copy your **Publishable key** (starts with `pk_live_...`)
4. Copy your **Secret key** (starts with `sk_live_...`)

> **Important:** Use the **test** keys (`pk_test_...`, `sk_test_...`) first while you're testing, then switch to live keys when you're ready to go live.

---

## Step 3 — Set up Resend for emails

1. Go to **https://resend.com** and sign up (free)
2. Go to **API Keys → Create API Key** — copy it (starts with `re_...`)
3. Go to **Domains → Add Domain** and add `alderneyweek.com`
4. Follow their instructions to add 2–3 DNS records to your domain
5. Once verified, emails will send from `noreply@alderneyweek.com`

> If you skip the domain step, you can use `onboarding@resend.dev` as the FROM address for testing — but it's not suitable for live use.

---

## Step 4 — Generate a JWT secret

This is a random string used to sign the access tokens. 

Go to: **https://generate-secret.vercel.app/64**

Copy the result — it will look like: `a3f8b2c9d1e7f4a6b8c0d2e5f7a9b3c5d7e1f3a5b7c9d1e3f5a7b9c1d3e5f7`

---

## Step 5 — Add environment variables to Netlify

1. In Netlify, go to your site → **Site configuration → Environment variables**
2. Add each of these:

| Variable | Value |
|---|---|
| `STRIPE_SECRET_KEY` | Your Stripe secret key (`sk_live_...`) |
| `JWT_SECRET` | The 64-character random string from Step 4 |
| `RESEND_API_KEY` | Your Resend API key (`re_...`) |
| `FROM_EMAIL` | `Alderney Week <noreply@alderneyweek.com>` |
| `SITE_URL` | `https://alderneyweek.com` (your actual URL, no trailing slash) |

3. Click **Save** and then **Trigger deploy** to redeploy with the new variables

---

## Step 6 — Test it

1. Visit your site on Netlify
2. Go to the Events page — you should see the paywall
3. Click **Pay £3** — Stripe will open
4. Use test card number `4242 4242 4242 4242`, any future expiry, any CVC
5. After payment, you should be redirected back to the events page — now unlocked
6. Check that you receive a confirmation email
7. Open a new browser window and test the "Already paid?" flow

---

## Step 7 — Switch to live mode

When you're happy everything works:

1. In Stripe, switch from **Test mode** to **Live mode** (toggle in top left)
2. Copy your **live** API keys
3. Update `STRIPE_SECRET_KEY` in Netlify environment variables
4. Trigger a redeploy

---

## Useful links

- Stripe dashboard: https://dashboard.stripe.com
- Netlify dashboard: https://app.netlify.com
- Resend dashboard: https://resend.com/overview
- View who has paid: Stripe → Payments
- Manage customers: Stripe → Customers

---

## Need help?

Email: info@alderneyweek.com

If something isn't working, the most common causes are:
- Environment variables not saved / site not redeployed after adding them
- Resend domain not verified (emails go to spam or don't send)
- `SITE_URL` has a trailing slash — it shouldn't
