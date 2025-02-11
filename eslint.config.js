export default {
  env: {
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "next",
      },
    ],
    "no-console": "warn",
    quotes: ["error", "double"],
    semi: ["error", "always"],
    indent: ["error", 2],
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
      },
    ],
    "no-trailing-spaces": "error",
  },
};
