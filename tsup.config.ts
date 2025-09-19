import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: false,
  target: 'es2020',
  splitting: false,
  external: [
    'react',
    'react-dom',
    'i18next',
    'react-i18next',
    'mobx',
    'mobx-react-lite'
  ]
})