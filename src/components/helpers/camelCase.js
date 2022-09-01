export const toCamelCase = (str) => {
    if (str.length) {
        return str.replace(/^\w|[A-Z]|\b\w/g, (word, index) => 
        index === 0
        ? word.toLowerCase()
        : word.toUpperCase()).replace(/\$+/g, '');
    } else {
        return '';
    }
}