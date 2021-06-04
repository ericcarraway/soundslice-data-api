module.exports = {
  env: {
    node: true,
  },

  extends: [
    `eslint:recommended`,

    `plugin:@typescript-eslint/eslint-recommended`,
    `plugin:@typescript-eslint/recommended`,

    // https://www.npmjs.com/package/eslint-config-airbnb-base
    // This package provides Airbnb's base JS .eslintrc (without React plugins)
    // as an extensible shared config.
    `airbnb-base`,

    `@percuss.io/eslint-config-ericcarraway`,
  ],

  parser: `@typescript-eslint/parser`,

  plugins: [`@typescript-eslint`],

  // don't continue to look for config files
  // in ancestor directories
  root: true,

  // custom overrides
  rules: {
    '@typescript-eslint/no-unused-vars': [
      `error`,
      // unused variables that start with "unused" are legal
      { varsIgnorePattern: `^unused` },
    ],
    '@typescript-eslint/no-var-requires': `off`,
    'import/extensions': `off`,
    'import/no-unresolved': `off`,
    'no-console': [
      `error`,
      {
        allow: [`log`, `warn`, `error`],
      },
    ],
  },
};
