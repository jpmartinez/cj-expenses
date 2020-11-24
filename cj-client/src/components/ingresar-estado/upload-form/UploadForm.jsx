import { useEffect, useRef, useState } from "react";
import { bancos, meses, monedas } from "../../../constantes";
import { useForm } from "../../../hooks";

function UploadForm({ setEstado }) {
    const [cuentas, setCuentas] = useState([]);
    const [uploaded, setUploaded] = useState(false);
    const [fileName, setFileName] = useState("...");

    useEffect(
        () =>
            fetch("/cuentas")
                .then((res) => res.json())
                .then((cuentas) => setCuentas(cuentas)),
        []
    );

    const fileInput = useRef(null);

    const [onSubmit, onChange, fields] = useForm(() => {
        const formData = new FormData();
        Object.keys(fields).forEach((key) => formData.append(key, fields[key]));
        formData.append("file", fileInput.current.files[0]);

        fetch("/upload", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((result) => {
                setUploaded(true);
                setEstado(result);
            });
    });

    return (
        <form onSubmit={onSubmit} className="panel px-5 py-5 is-shadowless has-background-white">
            <fieldset disabled={uploaded}>
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
                <div className="field is-small">
                    <label className="label is-small">Cuenta</label>
                    <div className="control">
                        <div className="select is-small">
                            <select name="cuenta" id="cuenta" onChange={onChange}>
                                <option value={null}>{}</option>
                                {cuentas.map((cuenta) => (
                                    <option key={cuenta.id} value={cuenta.id}>
                                        {cuenta.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="field is-small mr-3">
                        <label className="label is-small">Banco</label>
                        <div className="control">
                            <div className="select is-small">
                                <select name="banco" id="banco" onChange={onChange}>
                                    <option value={null}>{}</option>
                                    <option value={bancos.santander}>{bancos.santander}</option>
                                    <option value={bancos.brou}>{bancos.brou}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field is-small mr-3">
                        <label className="label is-small">Moneda</label>
                        <div className="control">
                            <div className="select is-small">
                                <select name="moneda" id="moneda" onChange={onChange}>
                                    <option value={null}>{}</option>
                                    <option value={monedas.peso}>{monedas.peso}</option>
                                    <option value={monedas.dolar}>{monedas.dolar}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field is-small mr-3">
                        <label className="label is-small">Mes</label>
                        <div className="control">
                            <div className="select is-small">
                                <select name="mes" id="mes" onChange={onChange}>
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
                <button type="submit" className="button is-primary">
                    Upload
                </button>
            </fieldset>
        </form>
    );
}

export default UploadForm;
