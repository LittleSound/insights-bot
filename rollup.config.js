import { defineConfig } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'


export default defineConfig({
  input: 'packages/core/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  plugins: [
    resolve(),
    esbuild(),
  ],
})
