export const joinClassNames = (...classNames) => classNames.reduce((res, k) => `${res} ${k}`, "");

export const roundTwoDecimals = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

function status(res) {
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return res;
}

export const fetch = {
    get: (url, callback, errorCallback) => {
        return window
            .fetch(url)
            .then(status)
            .then((res) => res.json())
            .then(callback)
            .catch(errorCallback);
    },

    put: (url, data, callback, errorCallback) => {
        return window
            .fetch(url, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(status)
            .then(callback)
            .catch(errorCallback);
    },

    post: (url, data, callback, errorCallback) => {
        return window
            .fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(status)
            .then(callback)
            .catch(errorCallback);
    },
};
