import { defineConfig } from 'vite';
import { resolve } from 'path';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: resolve(__dirname, 'src'),
    build: {
      sourcemap: true,
      outDir: '../dist',
      rollupOptions: {
        input: glob.sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return '[name].js';
          },
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      outDir: '../dist',
      emptyOutDir: true,
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/**/**.html']),
      SortCss({
        sort: 'mobile-first',
      }),
    ],
    server: {
      port: 5173,
    },
    css: {
      preprocessorOptions: {
        scss: {
          // Пример дополнительных настроек для SCSS
          additionalData: `@import "./src/scss/loader.scss";`, // Если хотите глобально подключать переменные или миксины
          includePaths: ['./src/scss/styles'], // Чтобы не использовать относительные пути при импорте
        },
      },
    },
  };
});
