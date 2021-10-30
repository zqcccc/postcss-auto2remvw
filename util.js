exports.isRegExp = (value) =>
  Object.prototype.toString.call(value) === "[object RegExp]"

exports.toFixed = function toFixed(number, precision) {
  const multiplier = Math.pow(10, precision + 1),
    wholeNumber = Math.floor(number * multiplier)
  return (Math.round(wholeNumber / 10) * 10) / multiplier
}
