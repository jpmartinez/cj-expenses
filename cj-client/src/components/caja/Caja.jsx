import { useEffect, useState } from "react";
import { meses } from "../../constantes";
import { useForm } from "../../hooks";

function Caja() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(
        () =>
            fetch("/categorias")
                .then((res) => res.json())
                .then((categorias) => setCategorias(categorias)),
        []
    );
    const mes = Object.values(meses)[new Date().getMonth()];
    const initialData = {
        mes,
        descripcion: "",
        categoria: "",
        monto: "",
    };

    const [onSubmit, onChange, reset, { fields, data }] = useForm(() => {
        setLoading(true);
        return fetch("/caja", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(() => {
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }, initialData);

    return (
        <div className="panel is-primary">
            <p className="panel-heading">Gasto Efectivo</p>
            {loading && <span>LOADING</span>}
            <form onSubmit={onSubmit} className="px-5 py-5 has-background-white">
                <fieldset>
                    <div className="field">
                        <label className="label">Mes</label>
                        <div className="control is-expanded">
                            <div className="select is-fullwidth">
                                <select {...fields.mes} id="mes" onChange={onChange}>
                                    {Object.values(meses).map((m) => (
                                        <option key={m} value={m}>
                                            {m}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Categoria</label>
                        <div className="control is-expanded">
                            <div className="select is-fullwidth">
                                <select {...fields.categoria} id="categoria" onChange={onChange}>
                                    <option value={null}>{}</option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Monto</label>
                        <div className="control">
                            <input
                                {...fields.monto}
                                id="monto"
                                className="input"
                                type="number"
                                placeholder="Monto"
                                onChange={onChange}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Descripción</label>
                        <div className="control">
                            <input
                                {...fields.descripcion}
                                id="descripcion"
                                className="input"
                                type="text"
                                placeholder="Descripción"
                                onChange={onChange}
                            />
                        </div>
                    </div>

                    <button type="submit" className="button is-primary">
                        Guardar
                    </button>
                </fieldset>
            </form>
        </div>
    );
}

export default Caja;
