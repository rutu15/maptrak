const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@assets": "src/assets",
    "@components": "src/components",
    "@reducers": "src/reducers",
    "@store": "src/store",
    "@utils": "src/utils",
    "@views": "src/views",
    "@services": "src/services",
    "@hooks": "src/hooks",
  })(config);

  return config;
};
