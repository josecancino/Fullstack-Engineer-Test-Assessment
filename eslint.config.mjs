import tseslint from 'typescript-eslint';

export default tseslint.config({
  ignores: ['apps/**', '**/dist/**', '**/node_modules/**'],
});
