import { defineConfig } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import alias from '@rollup/plugin-alias'
import dotenv from 'rollup-plugin-dotenv'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'


function useDefault(obj) {
  return typeof obj === 'function' ? obj : obj.default
}

export default defineConfig({
  input: 'packages/core/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true,
  },
  watch: {
    clearScreen: false,
  },
  external: [
    'jsdom',
    '@dqbd/tiktoken',
  ],
  plugins: [
    useDefault(dotenv)(),
    resolve(),
    commonjs(),
    json(),
    esbuild({
      sourceMap: true,
    }),
    alias({
      entries: {
        '~/core': './packages/core/index.ts',
        '~/share': './packages/share/index.ts',
      },
    }),
  ],
})
