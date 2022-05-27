console.log("A -> ", new Date());

setImmediate(() => {
  console.log("I -> ", new Date());
});

console.log("B -> ", new Date());