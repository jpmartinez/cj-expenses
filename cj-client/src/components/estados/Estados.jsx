import { useEffect, useState } from "react";
import Estado from "../ingresar-estado/estado/Estado";

function Estados() {
    const [estados, setEstados] = useState([]);
    const [value, setValue] = useState("");
    const [estado, setEstado] = useState("");

    useEffect(
        () =>
            fetch("/estados")
                .then((res) => res.json())
                .then((estados) => setEstados(estados)),
        []
    );

    return (
        <div className="container">
            <h1 className="title">Ver estado de cuenta</h1>
            <div className="panel px-5 py-5 is-shadowless has-background-white">
                <div className="field is-small">
                    <label className="label is-small">Estados</label>
                    <div className="control">
                        <div className="select is-small">
                            <select name="estados" id="estados" onChange={(e) => setValue(e.target.value)}>
                                <option value={value}>{}</option>
                                {estados.map((estado) => (
                                    <option key={estado.estadoId} value={estado.estadoId}>
                                        {`${estado.mes} - ${estado.nombre}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <button type="submit" className="button is-primary is-small" onClick={() => setEstado(value)}>
                    Cargar
                </button>
            </div>
            {!!estado && <Estado estado={estado} />}
        </div>
    );
}

export default Estados;
