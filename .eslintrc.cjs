module.exports = {
  // This is the root configuration file for ESLint
  root: true,

  // Specifies the environments where your code will run
  env: {
    node: true,
    es2022: true,
    browser: true,
  },

  // Extends recommended rule sets
  extends: [
    "eslint:recommended"
  ],

  // Specifies the parser for TypeScript files and other overrides
  overrides: [
    {
      // Handle JavaScript files
      files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
      extends: [
        "plugin:prettier/recommended"
      ],
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
    {
      // Handle TypeScript files
      files: ["**/*.ts"],
      extends: [
        "plugin:prettier/recommended"
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
    {
      // Define the configuration for `.astro` file.
      files: ["**/*.astro"],
      // All Astro-specific rules and plugins are defined here
      extends: [
        "plugin:astro/recommended",
        "plugin:astro/jsx-a11y-recommended",
        "plugin:prettier/recommended"
      ],
      // Allows Astro components to be parsed.
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript.
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
        // The `sourceType: "module"` is crucial for Astro's frontmatter script.
        sourceType: "module",
      },
      rules: {},
    },
  ],
};
