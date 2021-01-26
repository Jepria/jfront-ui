const path = require("path")

module.exports = {
  stories: ["../packages/**/stories/*.stories.tsx"],
  addons: [
    "storybook-addon-performance/register",
    "@storybook/addon-a11y",
    "@storybook/addon-storysource",
  ],
  typescript: {
    reactDocgen: false,
  },
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.less$/,
      use: [
        require.resolve("style-loader"),
        {
          loader: require.resolve("css-loader"),
          options: { modules: false },
        },
        require.resolve("less-loader"),
      ],
      include: path.resolve(__dirname, "../"),
    })

    // Return the altered config
    return config
  },
}
