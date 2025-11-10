import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  build: {
    // Performance optimizations
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          // Split UI components
          ui: ['src/Components/UI/HamburgerMenu.tsx'],
        },
      },
    },
    // Enable minification
    minify: true,
    // Optimize chunk sizes
    chunkSizeWarningLimit: 500,
    // Enable source maps for debugging (disable in production)
    sourcemap: false,
    // Target modern browsers for smaller bundles
    target: 'es2020',
  },
  // Development optimizations
  server: {
    hmr: {
      overlay: false
    }
  },
  // Enable CSS code splitting
  css: {
    devSourcemap: false
  }
});
