import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';
import UnoCSS from 'unocss/astro';

export default defineConfig({
  site: 'https://jcstrong.github.io',
  // 改名为 jcstrong.github.io 后去掉 base，顶级域名无需子路径
  base: '/',
  integrations: [
    vue(),
    mdx(),
    UnoCSS({ injectReset: true }),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
  vite: {
    ssr: {
      noExternal: ['unocss'],
    },
  },
});
