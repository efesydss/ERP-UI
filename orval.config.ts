import { defineConfig } from 'orval'
/*https://falcons-erp-api-dev.sd.iafl.net/api-docs?group=full-api */
export default defineConfig({
  erpApi: {
    input: {
      target: './openapi.json',
      filters: {
        mode: 'exclude',
        tags: ['filtering'],
      },
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
      }
    }
  },
  erpApiFiltering: {
    input: {
      target: './openapi.json',
      filters: {
        mode: 'include',
        tags: ['filtering'],
      },
    },
    output: {
      mock: true,
      target: './src/api/filtering.ts',
      mode: 'split',
      client: 'react-query',
      schemas: './src/api/model',
      override: {
         query:{
           useMutation: false,
           shouldExportMutatorHooks: false,
           useSuspenseQuery: true
         },
       }
    }
  }
})