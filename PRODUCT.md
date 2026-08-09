# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary user: recruiters and hiring managers screening candidates for full-stack / product engineering roles. They land on this site while evaluating many candidates back-to-back, mostly on desktop, and are skimming for a quick signal on whether to move the candidate forward. Copy and structure should reward a fast skim first, with real depth available for anyone who reads further (e.g. a technical interviewer who wants to dig into a case study before or during an interview).

## Product Purpose

A personal portfolio site for Muhammad Rizky Widodo, attached to job applications during an active job search. Success means a recruiter/hiring manager comes away convinced he can do real product engineering work end-to-end, not just write code — and takes the next step (interview, follow-up).

## Positioning

The claim a typical fresh-grad portfolio (tutorial clones, toy CRUD apps, generic project lists) can't make: these are real, shipped, in-production internal apps built during a professional internship (MRT Jakarta, Station Digitalization), not class assignments. The project case studies are framed as Problem/Solution/Impact rather than a feature list, because the differentiator is real-world impact, not a tech-stack checklist.

## Operating Context

- Job hunting is active and ongoing; the site is a living document, not a one-time artifact.
- Case-study content (MRT Jakarta internship work) was supplied directly by the user, not fabricated or embellished by Claude.
- Deployed as a static site on GitHub Pages (github.com/rizkywidodo/Portfolio), built and published via GitHub Actions on every push to `main`. Target custom domain is mrizkywidodo.com, but DNS/custom-domain is not yet configured (no CNAME file) — the site currently lives at https://rizkywidodo.github.io/Portfolio/. Any routing or asset-path decision must keep working at both a subpath and a future root domain.
- No image-generation tool is available in this environment. All visual "art" (sprites, icons, decorative graphics) must be hand-authored CSS/SVG, not raster images sourced from elsewhere.

## Capabilities and Constraints

- Stack: React 19 + TypeScript + Vite + Tailwind CSS v4 (CSS-first `@theme` config, no `tailwind.config.js`), `react-router-dom` with `HashRouter` (required for GitHub Pages' lack of server-side rewrites).
- The MRT Jakarta project code/data is internal work product from an internship and cannot simply be forked and republished as-is — likely NDA/ownership constraints. **Still undecided**, actively being weighed between: (a) forking the old project with its old/real data, or (b) a case-study writeup backed by screenshots and context, no live/forkable app. Option (a) carries the same IP exposure flagged previously (internal, possibly NDA'd data) and should not be treated as the safe default just because it was named as an option — surface that tradeoff again before it's acted on. Until resolved, project cards stay case-study-only (Problem/Solution/Impact) with no repo links for the MRTJ projects.
- Terminology: "case study" is the preferred framing for past work over "project" alone, to reinforce the Problem/Solution/Impact structure.

## Brand Commitments

Name: Muhammad Rizky Widodo. Contact: mrizkywidodo@gmail.com. Based in Greater Jakarta Area, Indonesia.

## Evidence on Hand

- Real internship experience: ~1 year as Station Digitalization Intern at MRT Jakarta — requirements gathering, PRD/BRD writing, Figma mockups, full-stack build (React/TypeScript/Supabase/Vercel), deployment. Content for these case studies (problem/solution/impact copy) was supplied verbatim by the user.
- Education: Informatics Engineering, ITS (Institut Teknologi Sepuluh Nopember), Surabaya, class of 2025, GPA 3.32, TOEFL ITP 540.
- No testimonials, press, or third-party proof exist yet — do not fabricate any.
- No live/forkable demo of the MRT Jakarta work exists yet (see undecided fork/screenshots decision above) — do not imply one exists.

## Product Principles

1. Real work over invented polish — every claim, number, and case study must trace back to something the user actually did; never fabricate proof to look more impressive.
2. Skim-first, depth-available — a recruiter scanning for 30 seconds and an interviewer reading closely should both get what they need from the same page.
3. Impact framing over feature listing — describe work as Problem/Solution/Impact, not a bullet list of technologies used.
4. Ship what's real, flag what's not — don't present in-progress ideas (like the MRTJ fork) as done, and don't let placeholder content pass as final.
