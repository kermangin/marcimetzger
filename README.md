# Marci Metzger homepage redesign

A single-page real estate homepage built with HTML, CSS, and vanilla JavaScript. Original content and imagery are from https://marcimetzger.com/.

## Local preview

From this directory, run:

```sh
python -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:4173/. No build step or dependencies are required.

## Project structure

- `dist/index.html`: page content and structure
- `dist/styles.css`: responsive layout and styling
- `dist/script.js`: navigation, gallery, and form interactions
- `dist/assets/`: original downloaded imagery and optimized WebP images

## Implementation

The redesign organizes the homepage into agent introduction, historical sales results, buyer/seller paths, search, gallery, services, affiliations, and contact. It uses responsive CSS Grid and Flexbox, keyboard-accessible navigation, and a native gallery dialog.

## Demo limitations

- Property search validates and summarizes filters; it is not connected to a live MLS/IDX feed.
- The contact form validates and previews messages locally; it does not send or store them.
- Google Maps is embedded third-party content. reCAPTCHA is not installed.
- Sales metrics are historical figures from 2021, retained from the reference homepage.

This is an independent assignment redesign, not the official brokerage website. Original content and imagery belong to their respective owners. Built with AI assistance and iteratively customized for the assignment.

For static hosting, use `dist` as the publish directory. Uploading this repository does not itself publish a website.
