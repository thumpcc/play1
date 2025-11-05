import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable React Fast Refresh
      fastRefresh: true
    })
  ],
  base: '/play1/', // Must match your GitHub repo name

  // Build optimizations
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable sourcemaps in production for smaller bundle
    minify: 'terser', // Use terser for better minification
    target: 'es2015', // Support modern browsers
    cssCodeSplit: true, // Enable CSS code splitting

    // Terser options for production
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true, // Remove debugger statements
        pure_funcs: ['console.log', 'console.info'], // Remove specific functions
      },
      format: {
        comments: false, // Remove comments
      },
    },

    // Rollup options
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom']
        },
        // Naming pattern for chunks
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      }
    },

    // Chunk size warnings
    chunkSizeWarningLimit: 1000, // Warn if chunk exceeds 1000kb

    // Disable reportCompressedSize for faster builds
    reportCompressedSize: false,
  },

  // Server configuration for development
  server: {
    port: 5173,
    strictPort: false,
    open: false,
    cors: true,
  },

  // Preview configuration
  preview: {
    port: 4173,
    strictPort: false,
    open: false,
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  }
})
