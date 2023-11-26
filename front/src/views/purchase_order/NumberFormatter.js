const handleInputNumberFormat = (event) => {
  var inputValue = event.target.value
  var formattedValue = formatNumberWithCommas(inputValue)
  event.target.value = formattedValue
  event.target.style.textAlign = 'right'
}
const handleValueNumberFormat = (number) => {
  var inputValue = number
  var formattedValue = formatNumberWithCommas(inputValue)
  return formattedValue
}
const formatNumberWithCommas = (number) => {
  var cleanNumber = number.replace(/,/g, '')
  var decimalIndex = cleanNumber.indexOf('.')
  if (decimalIndex !== -1) {
    var integerPart = cleanNumber.substring(0, decimalIndex)
    var decimalPart = cleanNumber.substring(decimalIndex + 1)
    return formatNumberWithCommas(integerPart) + '.' + decimalPart
  } else {
    return cleanNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}
export { handleInputNumberFormat, handleValueNumberFormat }
