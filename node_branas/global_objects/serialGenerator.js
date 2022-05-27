const config = require("./config");

const generate = () => {
  return Math.floor(Math.random() * config.max);
}

module.exports = {
  generate
};
