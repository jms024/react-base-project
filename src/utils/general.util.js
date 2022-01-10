export const deepCopyObject = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}