import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';

const jsToBottomNoModule = () => {
  return {
    name: 'no-attribute',
    transformIndexHtml(html) {
      html = html.replace(`type="module" crossorigin`, '');
      const match = html.match(/<script[^>]*>(.*?)<\/script[^>]*>/);
      if (!match) return html;
      let scriptTag = match[0];
      html = html.replace(scriptTag, '');
      html = html.replace('<!-- SCRIPT -->', scriptTag);
      return html;
    },
  };
};

const cssCrossOriginRemove = () => {
  return {
    name: 'css-cross-origin-remove',
    transformIndexHtml(html) {
      return html.replace(
        /(<link[^>]*rel=["']stylesheet["'][^>]*?)\s+crossorigin(?:=["'][^"']*["'])?/g,
        '$1'
      );
    },
  };
};

export default defineConfig({
  plugins: [
    tailwindcss(),
    injectHTML({
      tagName: 'Component',
    }),
    jsToBottomNoModule(),
    cssCrossOriginRemove(),
  ],
  publicDir: path.resolve(__dirname, '../landing-reference/public'),
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
        'get-started': path.resolve(__dirname, 'get-started.html'),
        about: path.resolve(__dirname, 'about.html'),
        features: path.resolve(__dirname, 'features.html'),
        compliance: path.resolve(__dirname, 'compliance.html'),
        contact: path.resolve(__dirname, 'contact.html'),
      },
      output: {
        entryFileNames: 'assets/main.js',
        assetFileNames: (assetInfo) => {
          return `assets/${assetInfo.name || '[name].[ext]'}`;
        },
      },
    },
    minify: false,
    modulePreload: false,
    cssMinify: false,
    assetsDir: 'assets',
  },
  server: {
    open: true,
  },
  base: './',
});
