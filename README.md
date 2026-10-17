# AI Marketing Expert Portfolio

A responsive, dependency-free static website with data-driven service and blog routes. It uses a small Node server to serve the same application at clean URLs. No package installation or build step is required.

## Run locally

Install Node.js 20 or newer, open this directory in a terminal, then run:

```sh
node server.mjs
```

Open <http://localhost:4173>. Set `PORT` to use a different local port.

## Personalize before launch

Edit `config.js` to replace the domain, portrait, email, phone, location, social profile URLs, booking URL, contact endpoint, privacy URL, terms URL and language. Nisha Kasalawat’s supplied name and homepage bio are already included. Add a real portrait path or URL to `portrait` when ready.

Change the domain in `config.js`, `index.html`, `robots.txt` and `sitemap.xml` before deployment. The sitemap currently lists the public routes and does not list draft articles.

## Booking provider

Set `bookingUrl` in `config.js` to an HTTPS scheduling page whose provider permits embedding. The consultation page then embeds that real provider. Leave it empty to show an honest setup state; no made-up calendar, availability or confirmation is presented. Provider-specific confirmation messages, notifications and webhook handling remain with the provider unless separately configured.

## Contact form provider

Set `contactEndpoint` to a real HTTPS server-side endpoint that accepts JSON `POST` requests with `name`, `email`, `business`, `website`, `service` and `message` fields. The endpoint must validate and limit field sizes, validate email/URL values, sanitize data for the destination, apply spam/rate-limit protections, protect any provider credentials on the server, and return a 2xx status only after it has safely accepted/stored or delivered the message. Configure CORS for this site if needed. The browser reports success only after a 2xx response; when no endpoint is configured, submission is blocked and shown as not sent. Do not put API secrets in `config.js`.

The current site does not store submissions itself. Do not advertise the form as live until an endpoint has been tested and configured.

## Blog content

Blog content and service catalog live in `app.js` as structured arrays. Add an article entry to `articles` with a unique URL-safe `slug`, `title`, `category`, `excerpt`, ISO date, reading-time estimate and `sections` array. Set `draft: true` while reviewing; drafts do not appear in the public listing or homepage. Remove the draft flag after editorial approval. Add the approved article URL to `sitemap.xml`. Draft entries are directly viewable by their slug for review and display a draft label, so do not use sensitive material there.

Article content should be checked for accuracy, sourcing, originality and useful human review before publishing. The starter entries are sample drafts, not published research or claims.

Service copy and catalog are also in `app.js`; each record owns its slug, description, deliverables, intended benefits, FAQs and process. Edit or remove a record there to update service navigation and cards.

## Deployment

Deploy the folder to any static hosting environment with Node.js support and configure it to run `node server.mjs`. For hosting that serves static files without running Node, configure its rewrite rule so unknown clean paths serve `/index.html`, preserve correct MIME types and send equivalent security headers. Replace the sample domain and review CSP if using a scheduling provider that requires additional domains or inline scripts. Use HTTPS in production.

## Included routes

`/`, `/about`, `/services`, `/services/ai-marketing-automation`, `/services/ai-social-media-marketing`, `/services/ai-lead-generation`, `/services/seo-aeo`, `/services/paid-ads`, `/services/content-marketing`, `/services/ai-business-growth-strategy`, `/blog`, `/blog/<slug>`, `/contact` and `/book-consultation`. Unknown paths render an in-app 404 page. Consultation buttons open `/contact#consultation` until a real booking URL is configured.

## Verification

This project has no dependency install step, compiler, linter or automated test suite. Run `node --check app.js` and `node --check server.mjs` for syntax checks. Browser-level responsive, navigation, provider, form-delivery, accessibility and deployment checks still need to be performed in the intended hosting environment before launch.
