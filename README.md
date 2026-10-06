# NHS landing pages

The hospital home page and five specialty landing pages are static HTML, with shared styling in `assets/landing.css` and language switching in `assets/landing.js`. No build dependencies are required to serve them.

Each specialty is available at both URL paths, such as `cardiology/index.html` and `cardiology-treatment/index.html`. Both versions render the same page.

All five specialties use the reference layout with NHS gold and navy branding in `scripts/specialty-design.cjs` and the scoped `assets/specialty.css`. Specialty headings, visual themes, and service icons are configured in `scripts/specialty-content.cjs`. Each has a generated illustrative hero: a heart, knee joint, urinary system, kidneys, or digestive organs. Specialist profiles use the hospital's existing doctor photographs.

## Update the pages

Specialist profiles, treatment descriptions and enquiry options are in `landing-content.json`. The page layout and introductory copy are in `scripts/redesign.cjs`.

After editing the content or template, regenerate and check the pages:

```sh
node scripts/redesign.cjs
node scripts/check-pages.cjs
```

The checks verify page structure, local assets, links, anchors, form endpoints and language switching.

`scripts/browser-check.cjs` connects to an isolated headless Chrome instance on local debugging port 9223. It checks all routes at 320, 390, 768 and 1440 pixels, Punjabi overflow, image loading, native form validation and FAQ interactions. It saves desktop, mobile, hero and full-page renders for every specialty in `.preview/`, then closes that browser instance. No form is submitted.

## Appointment enquiries

Each page has a compact form in the hero and a longer form farther down. Both POST to the existing Formester endpoint and use the existing thank-you redirect. They request a callback rather than confirming a booking. The Indian mobile field requires a valid 10-digit number and explicit contact consent.

Phone, email, WhatsApp and privacy links use the existing hospital contact details. End-to-end external form submission is not part of the local checks.
