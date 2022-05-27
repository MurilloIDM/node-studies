const interval = setInterval(() => {
  console.log('I -> ', new Date());
}, 1000);

setTimeout(() => {
  clearInterval(interval);
}, 5000);