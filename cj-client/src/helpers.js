export const joinClassNames = (...classNames) => {
    return classNames.reduce((res, k) => `${res} ${k}`, "");
};
