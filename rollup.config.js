import { defineConfig } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import alias from '@rollup/plugin-alias'
import dotenv from 'rollup-plugin-dotenv'


function useDefault(obj) {
  return typeof obj === 'function' ? obj : obj.default
}

export default defineConfig({
  input: 'packages/core/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  plugins: [
    useDefault(dotenv)(),
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
