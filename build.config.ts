import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  clean: true,
  rollup: {
    inlineDependencies: true,
    esbuild: {
      minify: true
    }
  },
  alias: {
    prompts: 'node_modules/prompts/dist/index.js'
  }
})
