import { appTools, defineConfig } from '@modern-js/app-tools';
import { tailwindcssPlugin } from '@modern-js/plugin-tailwindcss';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  runtime: {
    router: true,
  },
  plugins: [
    appTools({
      bundler: 'rspack', // Set to 'webpack' to enable webpack
    }),
    tailwindcssPlugin(),
  ],
  html: {
    disableHtmlFolder: true,
  },
  output: {
    distPath: {
      html: '',
    },
  },
  // source: {
  //   mainEntryName: 'index',
  // },
});
