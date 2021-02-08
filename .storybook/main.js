module.exports = {
  stories: ["../packages/**/stories/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "storybook-addon-performance/register",
    "@storybook/addon-a11y",
    "@storybook/addon-toolbars",
    "@storybook/addon-storysource",
  ],
  webpackFinal: async (config, { configType }) => ({
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules.slice(1),
        {
          test: /\.(ts|js|jsx|tsx?)$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                exclude: [
                  // \\ for Windows, / for macOS and Linux
                  /node_modules[\\/]core-js/,
                  /node_modules[\\/]webpack[\\/]buildin/,
                ],
                presets: ["@babel/preset-env"],
                plugins: ["@babel/plugin-proposal-class-properties"],
              },
            },
          ],
        },
      ],
    },
    resolve: {
      ...config.resolve,
      extensions: [...(config.resolve.extensions || []), ".ts", ".tsx"],
    },
  }),
}
