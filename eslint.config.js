import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import nextjs from '@next/eslint-plugin-next';

export default [
    {
        ignores: [
            'dist',
            'node_modules',
            'public/',
            '.next/',
            '*.config.{js,cjs,ts}',
            '.prettierrc.cjs',
            'jest.config.js',
            'tailwind.config.ts',
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        languageOptions: {
            ecmaVersion: 2023,
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            prettier: pluginPrettier,
            '@next/next': nextjs,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            ...pluginPrettier.configs.recommended.rules,
            ...configPrettier.rules,
            '@next/next/no-html-link-for-pages': 'error',
            '@next/next/no-img-element': 'warn',
            'no-unused-vars': 'off',
            'no-use-before-define': 'off',
            'react-hooks/exhaustive-deps': 'off',
            'no-underscore-dangle': 'off',
            'no-shadow': 'off',
            'class-methods-use-this': 'off',
            'no-alert': 'error',
            'no-caller': 'error',
            'no-constructor-return': 'error',
            'no-eval': 'error',
            'no-nested-ternary': 'error',
            'no-extend-native': 'error',
            'no-multi-assign': ['error'],
            'no-implicit-coercion': 'error',
            'no-lonely-if': 'warn',
            'no-unneeded-ternary': 'error',
            'no-else-return': ['error', { allowElseIf: false }],
            'prefer-object-spread': 'warn',
            'max-depth': ['error', 2],
            'consistent-return': ['error'],
            'no-implied-eval': 'error',
            'no-iterator': 'error',
            'no-labels': ['error'],
            'no-lone-blocks': 'error',
            'no-duplicate-imports': 'error',
            'no-empty-pattern': 'error',
            'no-new-func': 'error',
            'no-new-wrappers': 'error',
            'no-param-reassign': 'error',
            'no-proto': 'error',
            'no-return-assign': 'error',
            'no-script-url': 'error',
            'no-self-compare': 'error',
            'no-sequences': 'error',
            'no-useless-call': 'error',
            'no-useless-concat': 'error',
            'no-useless-return': 'warn',
            'no-console': ['warn', { allow: ['error'] }],
            'prefer-promise-reject-errors': [
                'error',
                { allowEmptyReject: true },
            ],
            'prefer-regex-literals': 'error',
        },
    },
];
