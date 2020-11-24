import { useState } from "react";

export const useForm = (callback) => {
    const [inputs, setInputs] = useState({});

    const onSubmit = (event) => {
        if (event) {
            event.preventDefault();
            callback();
            setInputs({});
        }
    };

    const onChange = (event) => {
        event.persist();
        setInputs((inputs) => ({
            ...inputs,
            [event.target.name]: event.target.value,
        }));
    };

    return [onSubmit, onChange, inputs];
};
