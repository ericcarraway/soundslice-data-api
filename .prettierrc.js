module.exports = {
  arrowParens: `always`,
  bracketSpacing: true,
  embeddedLanguageFormatting: `auto`,
  insertPragma: false,
  printWidth: 80,
  proseWrap: `preserve`,
  quoteProps: `as-needed`,
  requirePragma: false,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: `all`,
  useTabs: false,
  overrides: [
    {
      files: [`*.yml`],
      options: {
        singleQuote: false,
      },
    },
  ],
};
