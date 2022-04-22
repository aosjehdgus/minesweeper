module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["airbnb", "prettier", "plugin:prettier/recommended"],
  rules: {
    "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx"] }],
    "react/function-component-definition": 0,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
};
