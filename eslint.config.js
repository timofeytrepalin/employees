import vuePlugin from 'eslint-plugin-vue';
import vue3Essential from 'eslint-plugin-vue/lib/configs/vue3-essential.js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';
import prettier from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.{vue,ts,js,jsx,tsx}'],
    ignores: ['node_modules/**', 'dist/**', '.prettierrc.js', 'eslint.config.js', 'api/**'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        sourceType: 'module',
        project: './tsconfig.json',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      ...vue3Essential.rules,
      ...typescriptEslint.configs['recommended'].rules,
      ...prettier.rules,
      'no-console': [process.env.NODE_ENV === 'production' ? 'error' : 'warn', { allow: ['warn', 'error', 'info'] }],
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'vue/html-closing-bracket-newline': [
        'error',
        {
          singleline: 'never',
          multiline: 'always',
        },
      ],
      'vue/html-indent': ['warn', 2],
      'vue/multi-word-component-names': ['off'],
      '@typescript-eslint/explicit-function-return-type': ['off'],
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/no-use-before-define': ['off'],
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-empty-function': ['off'],
      '@typescript-eslint/no-var-requires': ['off'],
    },
  },
  {
    // Обработка .js файлов конфигурации без TypeScript
    files: ['.prettierrc.js', 'eslint.config.js'],
    ignores: ['node_modules/**', 'dist/**'],
    languageOptions: {
      parserOptions: {
        sourceType: 'module',
      },
    },
    rules: {
      ...prettier.rules,
      'no-console': 'off',
      'no-debugger': 'off',
    },
  },
];
