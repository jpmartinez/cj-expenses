export const joinClassNames = (...classNames) => classNames.reduce((res, k) => `${res} ${k}`, "");

export const roundTwoDecimals = (num) => Math.round((num + Number.EPSILON) * 100) / 100;
