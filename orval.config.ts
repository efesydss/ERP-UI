import { defineConfig } from 'orval'

export default defineConfig({
  erpApi: {
    input: {
      target: './api-spec/openapi.yaml'
    },
    output: {
      target: './api-spec/apiSchema.ts',
      client: 'react-query',
      override: {
        mutator: {
          path: './src/api/customMutator.ts',
          name: 'customMutator'
        }
      }
    },
  }
})
