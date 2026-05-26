# diploma-cloud-cyber-website

The fictional organisation website + downloadable document set supporting **ICT50220 — Diploma of Information Technology (Cloud and Cyber Security)** delivery at Kangan Institute. The site renders the **YAT College** scenario that frames every cluster assessment across the diploma — both the public-facing pages a prospective student would see, and the simulated staff intranet that consulting students consult while completing their assessment work.

> **YAT College is a fictional organisation used as a case study in an educational context.** Every page rendered by this site carries a persistent disclosure banner to that effect. No real YAT College exists; addresses, names, ABNs, and figures in the scenario are placeholders.

## What the site delivers

- A coherent **public-facing RTO website** at the root domain — homepage, study areas, about, locations, apply, contact — that reads as a real metropolitan registered training organisation.
- A simulated **staff intranet** at `/intranet/` — entered through a mock SSO sign-in page — carrying the in-world artefacts students reference during cluster assessments: ICT environment documentation, policies and procedures, project records, reference materials, and downloadable document templates.
- **State-versioned scenario content** — pages whose state evolves across the course (the ICT environment, the live project records) are published as one URL per cluster/AT version, with index pages listing every version and a passive breadcrumb on each version page pointing at its siblings.
- **Downloadable templates and exemplars** in `.docx` / `.pptx` / `.pdf` formats, served as static assets from the intranet's Templates and Project pages, mirroring the document library a real RTO consulting engagement would expose to staff and contractors.
- **Persistent simulated-environment disclosure** — a thin chrome banner across the top of every page, on every zone, indicating the site is a case study for educational use only and is not a real organisation.

The two zones share one visual identity (the YAT brand pack) but express it differently: the public site is warm cream, marketing-paced, hero-led; the intranet is neutral light-grey, denser, utility-tool in feel — reinforcing the narrative shift through the sign-in gate.

## Site structure

```
yat-college.example/
├── /                          marketing homepage
├── /study/                    study-areas catalogue
├── /about/                    mission, vision, strategic plan, people
├── /locations                 Cremorne campus
├── /apply                     enrolment information
├── /contact                   address, phone, contact form
├── /sign-in                   mock SSO gate
│
└── /intranet/                 (post sign-in)
    ├── /ict/                  ICT department — environment, diagrams, ops
    ├── /policies/             policies + procedures
    ├── /projects/             current + past consulting engagements
    ├── /reference/            industry standards, legislative, reference architectures
    └── /templates/            downloadable templates (.docx / .pptx)
```

The intranet structure is designed to absorb new sections and additional projects as future clusters are developed, via a configuration-driven section registry — adding a new top-level section or a new project under `/projects/` costs minimal effort. See the sitemap and extensibility specifications in the source repo for the full detail.

## Canonical specifications

The site is the rendered expression of design and content specifications that live in the sibling [`diploma-cloud-cyber`](https://github.com/Digital-Initiatives-Kangan-Institute/diploma-cloud-cyber) repo:

- `scenario/website.md` — sitemap, content principles (intranet is in-world only), state-versioning rules, mock SSO gate behaviour, navigation, and build conventions
- `scenario/branding/brand-pack.md` — brand essence, target audience, voice, palette, typography, logo direction, imagery direction, and the simulated-environment disclosure-banner specification
- `scenario/branding/assets/` — logos, favicons, photography sources
- `scenario/` (root) — the markdown source files migrated into this site as pages and downloadable templates

## Tech stack

| | |
|---|---|
| Static site generator | [Astro](https://astro.build) — content collections, MDX, file-based routing, zero-JS-by-default |
| TypeScript | strict mode |
| Hosting | Cloudflare Pages |
| Node | ≥ 22.12.0 |

## Local development

Prerequisites: Node 22.12.0 or higher.

```sh
# install dependencies
npm install

# start dev server with hot reload (default: http://localhost:4321)
npm run dev

# build the static site to ./dist
npm run build

# preview the production build locally
npm run preview
```

## Project structure

```
.
├── astro.config.mjs         site-level config
├── package.json             dependencies + scripts
├── tsconfig.json            TypeScript strict
├── public/                  static assets served as-is (favicons, downloadable templates)
├── src/
│   ├── pages/               file-based routes (.astro / .md / .mdx)
│   ├── layouts/             zone layouts (public, intranet, sign-in)
│   ├── components/          shared chrome — disclosure banner, navigation, breadcrumbs, version-listing
│   ├── content/             Astro content collections + frontmatter schemas
│   ├── styles/              brand-pack tokens + global styles
│   └── config/              section registry + nav registry (drives extensibility)
└── dist/                    build output (git-ignored)
```

## Licence

Internal Kangan Institute educational use. Branding, content, and templates are simulated for the YAT College case study and are not intended for any non-educational reuse.
