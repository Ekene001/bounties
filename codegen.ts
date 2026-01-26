import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './lib/graphql/schema.graphql',
  documents: ['lib/graphql/**/*.ts', 'lib/graphql/**/*.tsx', 'hooks/**/*.ts', 'hooks/**/*.tsx'],
  ignoreNoDocuments: true,
  generates: {
    './lib/graphql/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
        skipTypename: false,
        enumsAsTypes: true,
        dedupeFragments: true,
        avoidOptionals: {
          field: false,
          inputValue: false,
          object: false,
        },
        scalars: {
          DateTime: 'string',
          JSON: 'Record<string, any>',
        },
      },
    },
  },
};

export default config;