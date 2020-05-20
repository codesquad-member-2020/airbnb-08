module.exports = {
  presets: [
    [
      "@babel/preset-env",
      { useBuiltIns: "usage", targets: { browsers: [">1%"] }, corejs: 3 },
    ],
    "@babel/preset-typescript",
    "@babel/preset-react",
  ],
  plugins: ["@babel/proposal-class-properties", "@babel/syntax-dynamic-import"],
};
