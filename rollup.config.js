import { defineConfig } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import alias from '@rollup/plugin-alias'


export default defineConfig({
  input: 'packages/core/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  plugins: [
    resolve(),
    esbuild(),
    alias({
      entries: {
        '~/core': './packages/core/index.ts',
        '~/share': './packages/share/index.ts',
      },
    }),

  ],
})
