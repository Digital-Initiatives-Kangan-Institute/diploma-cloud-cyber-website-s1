/**
 * Astro content collections for the intranet.
 *
 * Each collection holds canonical-content markdown files. A single content
 * file can appear at multiple state-prefixed URLs via the `appearsIn` list
 * in its frontmatter — the dynamic route at
 * `src/pages/intranet/[state]/{category}/[item].astro` enumerates over
 * (state × content) at build time and renders the same content at each
 * applicable URL. Single source of truth per document.
 *
 * Stable documents (most policies + reference items) appear in every state.
 * State-versioned documents (ICT environment AT1 vs AT2 vs AT3 etc., when
 * authored) are separate canonical files each appearing in their own state.
 */

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docSchema = z.object({
  title: z.string(),
  description: z.string(),
  /** State slugs from src/config/states.ts STATES[].slug */
  appearsIn: z.array(z.string()).min(1),
  /** UoC mapping — rendered as the small unobtrusive footer per Tim 2026-05-26 */
  uocReferences: z.array(z.string()).optional(),
  /** True if the document is a placeholder (content not yet drafted) */
  placeholder: z.boolean().optional(),
  /**
   * Display order within a category landing or per-project documents listing.
   * Lower number first. Documents without an order fall to the end alphabetically.
   * Use to keep project documents in logical project-sequence order (MSA → role brief → …)
   * rather than alphabetical.
   */
  order: z.number().optional(),
  /**
   * Offset from current calendar year for evergreen year-labelled docs.
   * 0 = current year; -1 = prior year; -2 = two years prior. The dynamic
   * route computes the actual year at build time and prepends it to the
   * rendered title. Used by ICT operational costing docs.
   */
  yearOffset: z.number().optional(),
});

const policies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/policies' }),
  schema: docSchema,
});

const reference = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reference' }),
  schema: docSchema,
});

/**
 * Project-document collection — markdown files organised by project slug
 * inside src/content/projects/{project-slug}/{doc-slug}.md. The leading
 * path segment of an entry's id is the project slug; the dynamic route
 * at /intranet/[state]/projects/[project]/[item].astro splits on '/' to
 * determine project + document.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: docSchema,
});

/**
 * ICT operational collection — YAT-internal ICT documents (operational
 * costing baselines, environment overviews, network diagrams, server
 * status, hardware inventory, backup-recovery procedures, etc.). Some
 * items are stable across all states (e.g. current-year costing);
 * others are state-versioned (e.g. environment overview, with separate
 * canonical files per AT state). The dynamic route at
 * /intranet/[state]/ict/[item].astro generates one URL per item per
 * state in its appearsIn list.
 */
const ict = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ict' }),
  schema: docSchema,
});

export const collections = { policies, reference, projects, ict };
