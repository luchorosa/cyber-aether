import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://cyberaether.xyz',
  integrations: [tailwind()],
  outDir: './dist',
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx,svelte,vue}'],
  safelist: [
    'border-b-[#4F316F]',
    'bg-[#24093F]'
  ],
});