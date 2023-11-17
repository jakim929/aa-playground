/* eslint-disable no-console */
import { defineConfig } from 'tsup'

export default defineConfig({
  name: '@aa-playground/backend',
  entry: ['src/cmd/runService.ts', 'src/cmd/runWorker.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
})
