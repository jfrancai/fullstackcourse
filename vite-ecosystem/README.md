# Vite build tool

## Why Vite

Previous solutions:

- Webpack
- Rollup
- Parcel

Addressing the slow server start:

* Pre-bundling:

Those tools are built in JS/TS so they are slow for development process. Vite leverage esbuild which written in Go a compiled language.

When you run vite for the first time, Vite prebundles your project dependencies before loading your site locally. It is done automatically and transparently by default.

It's a 10 to 100x faster

* Source code

Code behind conditional dynamic imports is only processed if actually used on the current screen.

HRM : Hot Module Replacement is a blundler feature that Vite also improve by using native ESModules. When a file is edited, Vite only needs to precisely invalidate the chain between the edited module and its closest HMR boundary, making HMR updates consistemtly fast regardless of the size of your application.

Once you experience how fast Vite is, we highly doubt you'd be willing to put up with bundled development again.

## Why Bundle for Production?

ESM is now natively supported by most uptodate browser but it would be unefficent due to the additional network round trips caused by nested imports.

To get the optimal performance in production, it is still better to bundle your code with tree-shaking, lazy-loading and common chunk splitting.

## Why Not Bundle with esbuild?

For the time being, Rollup offers a better performance-vs-flexibility tradeoff.

## Comparision with other tools like Vite

- WWR is better if you build Preact app

- @web/dev-server require more manual set up. Vite is higher level and opinionated.

- Snowpack is no longer maintained.

- Astro a static site builder powered by Vite.

## Getting started

Vit aims to provide as faster and leaner development experience for modern web projects:

- A dev server that provides rich feature enhancements over native ES modules, for example exremely fast Hot Module Replacement (HMR).

- A build command that bundles your code with Rollup, pre-configured to output highly optimized static assets for production.

Vite is an opinionated tool but is can be extented using plugins.

## Scaffolding Your first Vite Project

```bash
npm create vite@latest
```

# Vitest

## Why Vitest

The need for a Vite native test runner

Existing option like Jest were created in a different context. There is a lot of duplication between Jest and Vite, forcing users to configure two different pipelies.

Vitest aims to position itself as the Test Runner of chilce for Vite projects, and as a solid alternative even for projects not using Vite.

[Comparisons with Other Test Runner](https://vitest.dev/guide/comparisons.html)
