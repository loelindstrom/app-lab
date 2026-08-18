/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      comment: 'Circular dependencies obscure initialization order and module ownership.',
      from: {},
      to: {
        circular: true
      }
    },
    {
      name: 'no-orphans',
      severity: 'warn',
      comment: 'Remove unused modules or add an explicit consumer.',
      from: {
        orphan: true,
        pathNot: [
          '[.]d[.]ts$',
          '(^|/)types[.]ts$'
        ]
      },
      to: {}
    },
    {
      name: 'no-undeclared-packages',
      severity: 'error',
      comment: 'Every runtime package import must be declared in package.json.',
      from: {},
      to: {
        dependencyTypes: ['npm-no-pkg', 'npm-unknown']
      }
    },
    {
      name: 'no-unresolvable-imports',
      severity: 'error',
      comment: 'Imports must resolve outside the bundler-specific exceptions below.',
      from: {},
      to: {
        couldNotResolve: true,
        // Vite resolves this supported asset import at build time.
        pathNot: '^@tailwindcss/browser\\?raw$'
      }
    },
    {
      name: 'production-does-not-import-tests',
      severity: 'error',
      comment: 'Shared test helpers belong outside test files when production code needs them.',
      from: {},
      to: {
        path: '[.](?:spec|test)[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$'
      }
    },
    {
      name: 'production-does-not-use-dev-dependencies',
      severity: 'error',
      comment: 'Production source must not rely on a package declared only for development.',
      from: {
        path: '^src',
        pathNot: [
          '[.](?:spec|test)[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$',
          '[.]d[.]ts$'
        ]
      },
      to: {
        dependencyTypes: ['npm-dev'],
        dependencyTypesNot: ['type-only'],
        pathNot: 'node_modules/@types/'
      }
    },
    {
      name: 'core-is-independent',
      severity: 'error',
      comment: 'Core owns local app state and must not depend on UI, runtime, or sync.',
      from: {
        path: '^src/core/'
      },
      to: {
        path: '^src/(?:ui|runtime|sync)/'
      }
    },
    {
      name: 'runtime-does-not-depend-on-ui-or-sync',
      severity: 'error',
      comment: 'Runtime owns the sandbox boundary and communicates through UI-provided callbacks.',
      from: {
        path: '^src/runtime/'
      },
      to: {
        path: '^src/(?:ui|sync)/'
      }
    },
    {
      name: 'sync-does-not-depend-on-ui-or-runtime',
      severity: 'error',
      comment: 'Sync is headless and must not import UI or sandbox runtime code.',
      from: {
        path: '^src/sync/'
      },
      to: {
        path: '^src/(?:ui|runtime)/'
      }
    }
  ],
  options: {
    doNotFollow: {
      path: ['node_modules']
    },
    tsPreCompilationDeps: false,
    tsConfig: {
      fileName: 'tsconfig.json'
    },
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default', 'types'],
      extensions: ['.ts', '.tsx', '.d.ts'],
      mainFields: ['module', 'main', 'types', 'typings']
    }
  }
};
