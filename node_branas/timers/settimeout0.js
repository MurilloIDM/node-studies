console.log("A -> ", new Date());

setTimeout(() => {
  console.log('I -> ', new Date());
}, 0);

console.log("B -> ", new Date());