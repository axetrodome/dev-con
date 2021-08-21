export const capitalFirst = (word) => {
    word = word.split(' ')[0];
    return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
}