const hasLowerCase = (string) => string.toUpperCase() !== string

const hasUpperCase = (string) => string.toLowerCase() !== string

const hasDigit = (string) => /\d/.test(string)

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLocaleLowerCase();

export { hasLowerCase, hasUpperCase, hasDigit, capitalize }