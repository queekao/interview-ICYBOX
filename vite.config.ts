import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import WebfontDownload from 'vite-plugin-webfont-dl'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
                    @use '~/styles/abstracts/mixins.scss' as *;
                `,
      },
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    WebfontDownload([
      'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&display=swap',
    ]),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/head', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/composables/**',
        'src/stores/**',
      ],
      vueTemplate: true,
      resolvers: [ElementPlusResolver()],
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'src/components.d.ts',
    }),
    // https://github.com/antfu/unocss
    Unocss({
      shortcuts: {
        'position-center':
          'absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2',
        'position-center-fixed':
          'fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2',
        'position-bottom':
          'absolute left-1/2 bottom-0 transform -translate-x-1/2',
      },
      rules: [
        ['w-fit-content', { width: 'fit-content' }],
        ['items-start-important', { 'align-items': 'flex-start !important' }],
        [
          /^background-image-(\src+)$/,
          ([, src]) => ({ 'background-image': `url(${src})` }),
        ],
        [/^border-radius-(\d+)$/, ([, d]) => ({ 'border-radius': `${d}px` })],
        [
          'grid-rows-auto-fit',
          { 'grid-template-rows': 'repeat( auto-fit, minmax(150px, 1fr) );' },
        ],
        [
          'grid-columns-auto-fit',
          {
            'grid-template-columns': 'repeat( auto-fit, minmax(150px, 1fr) );',
          },
        ],
        // for generate dynamic row and column
        [/^col-(\d+)$/, ([, d]) => ({ 'grid-column': `${d}` })],
        [/^row-(\d+)$/, ([, d]) => ({ 'grid-row': `${d}` })],
      ],
    }),
    createSvgIconsPlugin({
      // Specify the directory where your SVG icons are located
      iconDirs: [`${path.resolve(__dirname, 'src')}/assets/icons`],
      symbolId: 'icon-[name]',
      inject: 'body-last', // insert position
      customDomId: '__svg__icons__dom__', // id
      // Optional: Customize the generated Vue component name
    }),
  ],
  envDir: './',
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'jsdom',
    deps: {
      inline: ['@vue', '@vueuse'],
    },
  },
})
