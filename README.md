# SecureCart

SecureCart is a responsive React storefront built with Vite, Redux Toolkit, React Router, and the Fake Store API. Its visual theme takes inspiration from the supplied SecureKloud cover: fresh greens, clean surfaces, and a simple, modern shopping experience.

## Features

- Product discovery, search, category filtering, sorting, and product details
- Persistent shopping cart with quantity controls and shipping totals
- Saved items, local demo accounts, sign-in, and account order history
- Delivery form and simulated checkout, with a pay-on-delivery demo option
- Responsive navigation, landing page, and site-wide footer

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Deploy to Render

This repository includes a Render Blueprint in `render.yaml` for a static
site. In Render, choose **New → Blueprint**, connect this GitHub repository,
and apply the `securecart` service. Render runs `npm ci && npm run build` and
publishes `dist`; the rewrite rule supports React Router deep links.

Set `VITE_DEVREV_APP_ID` in the Render service's environment settings to the
public app ID from DevRev Plug settings, then trigger a deploy. This variable
is injected at build time, so redeploy after changing it.

## DevRev Plug (optional)

Copy `.env.example` to `.env.local` and set `VITE_DEVREV_APP_ID` to the public
app ID from DevRev Plug settings. Restart Vite after changing the environment
file. The Plug SDK is loaded once by the React app only when this value is set.

## Demo limitations

This is a frontend-only prototype. Accounts, cart contents, saved items, and placed demo orders are stored in the current browser's local storage. Passwords are PBKDF2-hashed before local storage, but client-side accounts are not a substitute for a trusted authentication service. The checkout does not collect card details, contact a payment provider, or charge money. Use a server-side payment integration and production authentication before accepting real customers or payments.

Product listings use [Fake Store API](https://fakestoreapi.com/) when available and switch to a local sample collection when the service is blocked or offline. Brand and fallback product art are served from `public/images`.
