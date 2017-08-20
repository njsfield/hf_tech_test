module.exports = {
  "extends": "prettier",
  "env": {
      "browser": true,
      "node": true
  },
  "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module"
  },
  "plugins": [
      "prettier"
  ],
  "rules": {
      "prettier/prettier": [
        "error", { "singleQuote": true }
      ],
      "no-unused-vars": [1, { "vars": "local", "args": "after-used" }]
  }
};
