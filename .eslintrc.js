module.exports = {
  env: {
    mocha: true,
    node: true,
  },

  extends: [
    `eslint:recommended`,

    // https://www.npmjs.com/package/eslint-config-airbnb-base
    // This package provides Airbnb's base JS .eslintrc (without React plugins)
    // as an extensible shared config.
    `airbnb-base`,

    `@percuss.io/eslint-config-ericcarraway`,
  ],

  // don't continue to look for config files
  // in ancestor directories
  root: true,

  // custom overrides
  rules: {
    'implicit-arrow-linebreak': [0],
    indent: [`error`, 2],
    'no-console': [
      `error`,
      {
        allow: [`log`, `warn`, `error`],
      },
    ],

    // hoisted functions are OK
    'no-use-before-define': [
      `error`,
      {
        functions: false,
      },
    ],

    'object-curly-newline': [0],
    'operator-linebreak': [
      `error`,
      `after`,
      {
        overrides: {
          ':': `before`,
          '?': `before`,
        },
      },
    ],
    'prefer-destructuring': [
      `error`,
      {
        array: true,
        object: true,
      },
    ],
    quotes: [`error`, `backtick`],
  },
};
