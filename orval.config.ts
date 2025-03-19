import { defineConfig } from 'orval'
/*https://falcons-erp-api-dev.sd.iafl.net/api-docs?group=full-api */
export default defineConfig({
  erpApi: {
    input: {
      target: './openapi.json'
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
