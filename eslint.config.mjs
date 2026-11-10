import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default tseslint.config(
  { ignores: ["**/dist/**", "**/node_modules/**", "apps/api/src/hygraph/generated/**", "**/coverage/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["apps/web/**/*.{ts,tsx}"],
    languageOptions: { globals: globals.browser },
    plugins: { "react-hooks": reactHooks },
    rules: { ...reactHooks.configs.recommended.rules },
  },
  {
    // Compile-time contract assertions intentionally use bare expressions.
    files: ["apps/api/test/type-contracts.ts"],
    rules: { "@typescript-eslint/no-unused-expressions": "off" },
  },
  {
    files: ["apps/api/**/*.ts", "scripts/**/*.mjs", "hygraph/**/*.mjs", "apps/api/*.mjs"],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["**/*.cjs"],
    languageOptions: { globals: globals.node, sourceType: "commonjs" },
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
);
