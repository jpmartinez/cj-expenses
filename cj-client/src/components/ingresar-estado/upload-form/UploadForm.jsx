import { useRef, useState } from "react";
import { meses } from "../../../constantes";
import { useForm } from "../../../hooks";

function UploadForm({ setEstado }) {
    const [uploaded, setUploaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState("...");

    const fileInput = useRef(null);

    const initialData = {
        cuenta: "",
        mes: "",
        banco: "",
        moneda: "",
    };

    //eslint-disable-next-line
    const [onSubmit, onChange, reset, change, { fields, data }] = useForm(() => {
        setLoading(true);
        const formData = new FormData();
        Object.keys(data).forEach((key) => formData.append(key, data[key]));
        formData.append("file", fileInput.current.files[0]);
        fetch("/api/upload", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((result) => {
                setLoading(false);
                setUploaded(true);
                setEstado(result);
            });
    }, initialData);

    if (loading) {
        return <div>Loading</div>;
    } else {
        return (
            <form onSubmit={onSubmit} className="panel px-5 py-5 is-shadowless has-background-white">
                <fieldset disabled={uploaded}>
                    <div className="field is-grouped">
                        <div className="field is-small">
                            <label className="label is-small">Estado de cuenta</label>
                            <div className="file has-name is-small">
                                <label className="file-label is-small">
                                    <input
                                        className="file-input"
                                        type="file"
                                        name="file"
                                        id="file"
                                        ref={fileInput}
                                        onChange={(e) => setFileName(e.target.files[0].name)}
                                    />
                                    <span className="file-cta">
                                        <span className="file-icon">
                                            <i className="fas fa-upload"></i>
                                        </span>
                                        <span className="file-label">Choose a file…</span>
                                    </span>
                                    <span className="file-name">{fileName}</span>
                                </label>
                            </div>
                        </div>

                        <div className="field is-small mx-4">
                            <label className="label is-small">Mes</label>
                            <div className="control">
                                <div className="select is-small">
                                    <select {...fields.mes} id="mes" onChange={onChange}>
                                        <option value={null}>{}</option>
                                        {Object.values(meses).map((mes) => (
                                            <option key={mes} value={mes}>
                                                {mes}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="button is-primary" disabled={!data.mes}>
                        Upload
                    </button>
                </fieldset>
            </form>
        );
    }
}

export default UploadForm;
