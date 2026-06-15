import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // use Sass's modern API (faster, no legacy warning)
        // Bootstrap 5.3's own Sass uses APIs Dart Sass now flags as deprecated.
        // These warnings come from node_modules, not our code — quiet them so
        // the dev/build output stays readable. Remove when Bootstrap updates.
        quietDeps: true,
        silenceDeprecations: ['import', 'color-functions', 'global-builtin'],
      },
    },
  },
  server: {
    open: true, // auto-open the browser on `npm run dev`
    port: 5173,
  },
})
