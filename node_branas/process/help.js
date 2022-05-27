const options = [
  "a) pid",
  "b) title",
  "c) arch",
  "d) platform",
  "q) quit",
  "e) env",
  "m) memory-usage",
  "u) uptime",
  "v) versions"
];

exports.showOptions = () => {
  options.forEach((option) => {
    console.log(option);
  });
}
