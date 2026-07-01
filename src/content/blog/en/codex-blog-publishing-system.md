---
title: 'Turn Codex Work into Blog Posts: The Publishing System I Built for My Own Blog'
description: 'A practical workflow for turning Codex sessions into live bilingual long-form posts, with content rules, validation, and automatic Cloudflare deployment.'
pubDate: 2026-06-21
category: 'AI Workflow'
tags:
  - 'Codex'
  - 'AI Writing'
  - 'AI Workflow'
  - 'Automation'
  - 'Publishing'
  - 'Astro'
  - 'Cloudflare'
readTime: '8 min'
lang: en
translationKey: 'codex-blog-publishing-system'
template: 'workflow-tutorial'
socialSummary: 'A practical workflow for turning Codex sessions into bilingual long-form posts, with content rules, validation, and automatic Cloudflare deployment.'
draft: false
---

The most useful thing to preserve from a Codex session is rarely the final diff. It is the reasoning around it: why the change was made, which paths were rejected, what constraints had to stay intact, and how the result was verified. I built a small publishing system around that idea. When I say “publish to blog,” Codex now creates a bilingual long-form post, validates it, deploys it, and verifies the live page. Draft mode remains available only when I explicitly ask for it.

## Why I needed this system

I use Codex for real work: reviewing UI, improving accessibility, fixing build tooling, deploying a header change to Cloudflare, then reverting that header after seeing the live result. Each task looks like a small implementation request, but the useful writing material is usually hidden in the process.

The header example was not really about whether a blue navigation bar should be lighter or heavier. The reusable questions were more interesting:

- When asking AI to improve an interface, should I start with taste, or with design constraints?
- Why does blog readability require more than color and spacing changes?
- How do I stop AI-generated content from going live before review?
- If I want Codex work to become publishable writing, what infrastructure should the blog provide?

Without a system, these ideas disappear into chat history. A few days later, I remember that something was useful, but not the exact sequence of decisions. So I decided to attach content capture to the end of the work itself, not to a vague future writing session.

## The core rule: the trigger phrase is the publishing approval

The first version of this system was draft-first: generate the article, stop, and wait for explicit approval. That was safe, but it added friction. I later realized that the trigger phrase itself can carry the approval boundary. If I say “publish to blog,” I am not asking for a private note. I am giving a publishing instruction.

So the final rule is: publish directly by default, but keep validation and safety checks in the path. Draft mode is still available, but only when I explicitly say “draft first” or “do not publish yet.”

So the boundary is explicit:

| Stage            | What can be automated                                  | Boundary that remains                                    |
| ---------------- | ------------------------------------------------------ | -------------------------------------------------------- |
| Topic extraction | Find the problem, decisions, and reusable method       | Use only public-safe material                            |
| Writing          | Create Chinese and English long-form versions          | Do not invent facts or expose private details            |
| File creation    | Generate Markdown, frontmatter, slug, and reading time | Default to `draft: false` unless draft mode is requested |
| Validation       | Run schema checks, linting, Astro check, and build     | Stop immediately if any step fails                       |
| Deployment       | Deploy to Cloudflare and check the public page         | Verify the URL after deployment                          |

That table is the principle behind the whole system. The trigger phrase defines intent. The scripts turn that intent into a reliable publishing path.

## How I built it into the blog

This is not a separate writing app. It is a small layer inside the blog project itself. The blog is an Astro site. Chinese posts live in one content folder, English posts live in another, and both versions share a slug and translation key.

Astro is a good fit for this because Content Collections can enforce frontmatter shape, query content metadata, and give type-aware content handling during development and build. That matches how the official [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) documentation describes the feature: a way to organize and query structured content instead of treating Markdown files as loose files.

The first change was adding a `draft` field to the blog schema. It started as a default draft gate. After changing the workflow to direct publishing, the normal generated post now uses:

```yaml
draft: false
```

The draft filter still matters. Local development can show `draft: true` posts, while production builds filter them out. That gives me a safety valve when I explicitly want review-first behavior, without slowing down the default publish path.

The second change was turning file creation into a script. If I ask AI to hand-write Markdown files every time, it has to remember slug rules, translation keys, reading time, frontmatter shape, and folder paths. That is exactly the kind of repetitive structure that should be automated.

Now the draft script receives one JSON payload:

```json
{
  "slug": "codex-blog-publishing-system",
  "category": "AI Workflow",
  "tags": ["Codex", "AI Writing", "Automation"],
  "zh": {
    "title": "Chinese title",
    "description": "Chinese description",
    "body": "Chinese body"
  },
  "en": {
    "title": "English title",
    "description": "English description",
    "body": "English body"
  }
}
```

The script writes both Markdown files, computes reading time, and keeps the slug and translation key consistent. That separates writing quality from file mechanics. Codex focuses on the article. The script handles the boring parts that should not vary.

The third change was making publishing a separate script. It ensures both language versions are `draft: false`, runs linting, runs Astro checks, builds the site, then deploys. In the default workflow, this runs immediately after the article files are generated. In the exception workflow, it can still publish an existing draft later.

That deployment path fits the current Cloudflare setup. Cloudflare’s [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) documentation describes how Wrangler uploads files from a configured assets directory during deployment. My project already has the Wrangler configuration, so the publish script only needs to connect build validation with the deploy command.

## Before and after

| Before                                                          | After                                                                                        |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| I had to remember which Codex sessions were worth writing about | “Publish to blog” turns the session into a live article                                      |
| AI could write prose, but file format had to be explained again | The skill knows the project schema, folders, tags, and scripts                               |
| Chinese and English versions could drift apart                  | Chinese is written first, English is rewritten idiomatically, both share one translation key |
| Writing and publishing were mixed together                      | The trigger phrase defines whether this is direct publish or draft mode                      |
| Validation depended on what I remembered to run                 | The publish script runs lint, check, build, then deploys                                     |
| Private details could leak into public writing                  | The skill requires sensitive details to be abstracted away                                   |

The most important change is explicit intent. When I say “publish to blog,” the system treats that as a publishing workflow and completes it. When I say “draft first,” it stops before deployment.

## Why this skill only writes long-form articles

This blog has long-form posts and shorter notes, but this skill only writes long-form posts. That is intentional. Short notes are closer to personal reflection, and I want to write those myself. Codex is more useful when the material is procedural: workflows, case studies, tradeoffs, debugging lessons, and repeatable methods.

A Codex session is worth a long-form post only if it can answer questions like these:

- What was the original request?
- How did I direct the AI?
- What did the AI actually change?
- What constraints shaped the work?
- What would I repeat next time?
- Where would someone else likely make a mistake?

Those questions need space. Long-form does not mean padding. It means preserving the reasoning chain from context to decision to implementation to verification.

## Chinese first, English as a rewrite

The default language is Chinese because that is where the original thinking usually happens for me. The Chinese version defines the claim, structure, and example. The English version is then rewritten for English readers, not translated line by line.

That distinction matters. A literal translation often carries over sentence shapes that feel natural in Chinese but stiff in English. A better English version keeps the same argument while adjusting title, paragraph rhythm, and emphasis.

For example, a Chinese title might be:

> 把 Codex 的工作过程变成博客：我给自己做了一个“发布到博客”系统

A natural English title is not a literal translation. It is closer to:

> Turn Codex Work into Blog Posts: The Publishing System I Built for My Own Blog

The point is not to produce two mirrored files. The point is to express one method clearly in two languages.

## A reusable checklist

If I were adding this workflow to another content site, I would follow this sequence:

1. Map the content model: where posts live, which frontmatter fields are required, and how routes are generated.
2. Add a draft field: keep `draft: true` as an exception path, and make production builds filter drafts.
3. Create a draft script: let code handle slug, reading time, translation keys, and frontmatter.
4. Define a trigger phrase: make “publish to blog” explicit, so ordinary conversation does not accidentally invoke the workflow.
5. Define the default: “publish to blog” publishes directly; “draft first” stops for review.
6. Put the quality bar in the skill: require a concrete walkthrough, a comparison table, a checklist, and public-safe wording.
7. Run validation before publishing: schema, lint, check, and build should pass.
8. Verify the live site after deployment: deploy logs are useful, but the public URL is the real check.

Skipping step 2 creates accidental publishing risk. Skipping step 3 creates format drift. Skipping step 6 produces generic AI summaries instead of useful articles.

## Common questions

### Will this make the blog sound like AI?

It can, if the article only summarizes outcomes. The fix is to require the draft to include the raw request, decisions, implementation tradeoffs, and verification. “What happened” is usually not enough. “Why this path was chosen” is where the human judgment appears.

### Is direct publishing too risky?

It is risky if the trigger is vague or if validation is weak. In my workflow, the trigger phrase is explicit, and the system still checks content safety, structure, schema, linting, and build output before deployment. Risk control does not always mean adding another manual approval step. It can also mean making the publishing path strict enough to fail safely.

### Why create an English version at all?

The English version forces the method to become more general. If a workflow only makes sense in the original conversational context, it probably has not been abstracted enough. Rewriting in English exposes unclear structure.

### Is this only useful for technical blogs?

No. Any site that publishes reusable work can use the same pattern: product decisions, design reviews, growth experiments, automation notes, or debugging stories. The implementation changes by project, but the workflow is the same.

## Closing recap

What I wanted was not “AI writes my blog for me.” I wanted my daily work with Codex to stop disappearing. Every useful session contains decisions, constraints, and lessons. Turning those into articles does not require reckless auto-publishing. It requires a publishing path that can validate, fail safely, deploy, and verify the live result.

Now I have a clear entry point. When I say “publish to blog,” Codex creates the bilingual article, validates it, deploys it, and checks the live page. If I want review first, I say so explicitly.

That is the version of AI-assisted writing I want: AI organizes the process and runs the publishing chain; I define the boundary and the direction.
