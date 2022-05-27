setTimeout(() => {
  console.log("A -> ", new Date());
}, 3000);

const setB = setTimeout(() => {
  console.log("A -> ", new Date());
}, 3000);

clearTimeout(setB);
