module.exports = {
  '*.js': [
    'yarn lint:eslint',
    'yarn lint:prettier',
    'git add',
    'yarn test:unit:file',
  ],
  '{!(package)*.json,*.code-snippets,.*rc}': [
    'yarn lint:prettier --parser json',
    'git add',
  ],
  'package.json': ['yarn lint:prettier', 'git add'],
  '*.vue': [
    'yarn lint:eslint',
    'yarn lint:stylelint',
    'yarn lint:prettier',
    'git add',
    'yarn test:unit:file',
  ],
  '*.scss': ['yarn lint:stylelint', 'yarn lint:prettier', 'git add'],
  '*.{jpeg,jpg,png,gif,svg}': ['imagemin-lint-staged', 'git add'],
};
