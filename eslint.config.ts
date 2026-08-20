import {
  defineConfig,
  GLOB_SRC_EXT,
  nextjs,
  playwright,
  prettier,
  react,
  tailwindcss,
  vitest,
} from '@nelsonlaidev/eslint-config'

export default defineConfig(
  vitest({
    files: [`src/tests/unit/**/*.test.${GLOB_SRC_EXT}`],
  }),
  playwright({
    files: [`src/tests/e2e/**/*.test.${GLOB_SRC_EXT}`],
    rules: {
      'playwright/expect-expect': [
        'error',
        {
          assertFunctionNames: ['a11y', 'checkAppliedTheme', 'checkStoredTheme'],
        },
      ],
    },
  }),
  react({
    files: ['**/*.ts', '**/*.tsx'],
  }),
  nextjs({
    files: ['**/*.ts', '**/*.tsx'],
  }),
  tailwindcss({
    settings: {
      'better-tailwindcss': {
        entryPoint: './src/styles/globals.css',
        rootFontSize: 16,
      },
    },
    rules: {
      'better-tailwindcss/no-unknown-classes': [
        'error',
        { ignore: ['not-prose', 'shiki', 'toaster', 'bento-card', 'testimonial-highlight', 'hover-word'] },
      ],
    },
  }),
  {
    rules: {
      'import-x/no-namespace': [
        'error',
        {
          ignore: ['zod', './schemas'],
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'next/navigation',
              importNames: ['usePathname', 'useRouter', 'redirect', 'permanentRedirect'],
              message: 'Please use `@/i18n/routing` instead.',
            },
            {
              name: 'next/link',
              importNames: ['default'],
              message: 'Please use `@/components/ui/link` instead.',
            },
            {
              name: 'next/router',
              importNames: ['default'],
              message: 'App Router only — use `@/i18n/routing`.',
            },
          ],
        },
      ],
      'unicorn/name-replacements': 'off',
      'unicorn/no-non-function-verb-prefix': 'off',
      'unicorn/prefer-uint8array-base64': 'off',
      'unicorn/no-unnecessary-global-this': 'off',
      'unicorn/better-dom-traversing': 'off',
      'unicorn/no-this-outside-of-class': 'off',
      'unicorn/no-top-level-assignment-in-function': 'off',
      'unicorn/prefer-await': 'off',
      'unicorn/no-confusing-array-splice': 'off',
      'unicorn/consistent-boolean-name': 'off',
      'unicorn/no-declarations-before-early-exit': 'off',
      'unicorn/prefer-minimal-ternary': 'off',
      'unicorn/prefer-set-methods': 'off',
      'unicorn/no-array-sort': 'off',
      'unicorn/prefer-hoisting-branch-code': 'off',
      'unicorn/prefer-observer-apis': 'off',
      'unicorn/prefer-iterator-to-array': 'off',
      'unicorn/no-computed-property-existence-check': 'off',
      'unicorn/no-unreadable-object-destructuring': 'off',
      'unicorn/no-unreadable-array-destructuring': 'off',
      'unicorn/no-global-object-property-assignment': 'off',
      'unicorn/prefer-single-call': 'off',
      'unicorn/no-unsafe-string-replacement': 'off',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/no-useless-template-literals': 'off',
      'unicorn/no-process-exit': 'off',
      'unicorn/no-break-in-nested-loop': 'off',
      '@eslint-react/immutability': 'off',
      '@eslint-react/no-leaked-conditional-rendering': 'off',
      '@eslint-react/use-state': 'off',
      '@eslint-react/purity': 'off',
      '@eslint-react/naming-convention-ref-name': 'off',
      '@eslint-react/exhaustive-deps': 'off',
      '@eslint-react/set-state-in-effect': 'off',
      '@eslint-react/no-array-index-key': 'off',
      '@eslint-react/dom-no-missing-button-type': 'off',
      '@eslint-react/dom-no-dangerously-set-innerhtml': 'off',
      '@eslint-react/dom-no-unsafe-iframe-sandbox': 'off',
    },
  },
  prettier(),
)
