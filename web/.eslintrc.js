module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-undef": "off",
    "key-spacing": "warn",
    "keyword-spacing": "warn",
    "indent": ["warn", 2, { "SwitchCase": 1 }],
    "no-trailing-spaces": "warn",
    "no-multi-spaces": "warn",
    "space-unary-ops": "warn",
    "no-multiple-empty-lines": "warn",
    "object-curly-spacing": ["warn", "always"],
    "space-before-blocks": "warn",
    "comma-spacing": "warn",
    "space-in-parens": "warn",
    "eol-last": "warn",
    "brace-style": ["warn", "stroustrup"],
    "no-control-regex": 0,
    "space-before-function-paren": "off",
    "no-unused-vars": "warn",
    "quote-props": "off",
    "dot-notation": "off",
    "require-await": "off",

    "vue/singleline-html-element-content-newline": "off",
    "vue/no-v-html": "off",
    "vue/multi-word-component-names": "off",
    "vue/html-indent": ["warn", 2],
    "vue/require-prop-types": "off",
    "vue/require-default-prop": "off",
    "vue/attribute-hyphenation": "off",
    'vue/max-attributes-per-line': [
      'warn', {
        'singleline': 5,
      },
    ],
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
}
