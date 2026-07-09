// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` is the canonical base URL used for sitemap entries and any other
// absolute-URL generation — the deployed domain for the YAT scenario site.
export default defineConfig({
  site: 'https://yat.timbaird.com',

  integrations: [
    sitemap({
      // The intranet is meant to feel behind a sign-in gate — public-search
      // indexing it would break the simulation. Sign-in itself isn't useful
      // to surface in search results either.
      filter: (page) =>
        !page.includes('/intranet/') &&
        !page.includes('/sign-in/'),
    }),
  ],
});
