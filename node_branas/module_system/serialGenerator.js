
let createSerialGenerator = function() {
  let max = 10000;

  const generate = function() {
    return Math.floor(Math.random() * max);
  };

  return {
    generate
  };
};

module.exports = createSerialGenerator();
