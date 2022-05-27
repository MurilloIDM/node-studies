const interval = (callback, time) => {
  setTimeout(() => {
    callback();
    interval(callback, time);
  }, time)
};

interval(function () {
  console.log('R -> ', new Date());
}, 1000);