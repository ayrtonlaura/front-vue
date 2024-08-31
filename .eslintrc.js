// eslint-disable-next-line no-undef
module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue-pug/vue3-recommended'
  ],
  rules: {
    'vue/component-definition-name-casing': ['error', 'kebab-case'],
    'vue/no-unused-vars': 'error',
    'vue/no-v-html': 'off',
    'vue/no-v-model-argument': 'off',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 30
        },
        multiline: {
          max: 30
        }
      }
    ]
  }
}
