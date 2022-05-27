exports.onReadable = function(callback) {
  process.stdin.on('readable', function() {
    const chuck = process.stdin.read();
    if (chuck) callback(chuck.toString().replace(/(\n)|(\r)/g, ""));
  });
}
