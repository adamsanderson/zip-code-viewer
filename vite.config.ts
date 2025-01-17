import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wyw from '@wyw-in-js/vite';

// https://vite.dev/config/
export default defineConfig(({command}) => ({
  // Set base for github pages builds, leave undefined for dev server.
  base: command === 'build' ? 'zip-code-viewer' : undefined,
  plugins: [
    react(), 
    wyw({
      include: ['**/*.{ts,tsx}'],
      babelOptions: {
        presets: ['@babel/preset-typescript', '@babel/preset-react'],
      },
    }),
  ],
}))