import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    /**
     * Configure the dev server [cite: 454]
     */
    server: {
        port: 3000, // We can set a specific port
        open: true,   // Automatically open the app in the browser on "npm run dev"
    },

    /**
     * Configure build options [cite: 453]
     */
    build: {
        outDir: 'dist',   // Matches your tsconfig.json 'outDir' [cite: 33]
        sourcemap: true, // Generate source maps for easier debugging in production
    }
});