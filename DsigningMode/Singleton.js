var getSingle = function (fn) {
  var instance;
  return function () {
      return instance || ( instance = fn.apply(this, arguments) );
  }
}