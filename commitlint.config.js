const typeEnum = require('./.cz-config');

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', typeEnum.types.map(i => i.value)],
    // subject 大小写不做校验
    'subject-case': [0],
  },
};
