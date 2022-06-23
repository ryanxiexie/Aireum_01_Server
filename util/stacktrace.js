const StackTrace = require('stacktrace-js');

var callback = function (stackframes) {
  var st = [];
  // var stringifiedStack =
  stackframes.map(function (sf, key) {
    //only take the first 2 sf
    key < 2 && st.push(sf);
  });
  // .join('\n');
  // console.log(st);
  return st;
  // console.log('heyy');
  // return stackframes;
};

var errback = function (err) {
  console.log(err.message);
};

var myFunc = function (arg) {
  return 'Hello ' + arg;
};

var trace = () => {
  var traceData;
  // StackTrace.instrument(myFunc, callback, errback);
  StackTrace.get()
    .then(callback)
    .then((data) => {
      traceData = data;
      // console.log('traceData is ', traceData);
    })
    .catch(errback);

  return traceData;
  // trace().then((data) => console.log('data is ', data));
};

module.exports = { trace, StackTrace, callback, myFunc, errback };
