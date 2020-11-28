import { useState } from "react";

const processFormData = (data) => {
    if (!Object.keys(data).length) {
        return {};
    }
    return Object.keys(data).reduce((res, key) => ({ ...res, [key]: { name: key, value: data[key] } }), {});
};
export const useForm = (callback, initialState = {}) => {
    const [fields, setFields] = useState(processFormData(initialState));
    const [data, setData] = useState(initialState);

    const onSubmit = (event) => {
        if (event) {
            event.preventDefault();
            callback();
            reset();
        }
    };

    const onChange = (event) => {
        event.persist();
        setFields({
            ...fields,
            [event.target.name]: {
                name: event.target.name,
                value: event.target.value,
            },
        });
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    const change = (field, value) => {
        setFields({
            ...fields,
            [field]: {
                name: field,
                value: value,
            },
        });
        setData({
            ...data,
            [field]: value,
        });
    };

    const reset = () => {
        setData(initialState);
        setFields(processFormData(initialState));
    };

    return [onSubmit, onChange, reset, change, { fields, data }];
};
