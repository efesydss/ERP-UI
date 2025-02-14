import { defineConfig } from 'orval'

export default defineConfig({
  erpApi: {
    input: {
      target: './openapi.yaml'
    },
    output: {
      mock: true,
      target: './src/api/',
      mode: 'split',
      client: 'react-query',
      schemas: './src/api/model',
      override: {
        query:{
          useSuspenseQuery: true
        },
       /* operations: {
          MaterialGroups: {
            query: {
              useSuspenseQuery: true,
            }
          }
        },*/
        mutator: {
          path: './src/api/customMutator.ts',
          name: 'customMutator'
        }
      }
    }
  }
})
