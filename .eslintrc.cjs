module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "plugin:@typescript-eslint/recommended"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  plugins: ["@typescript-eslint"],
}
