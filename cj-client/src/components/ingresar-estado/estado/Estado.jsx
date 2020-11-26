import { useEffect, useState } from "react";
import { joinClassNames } from "../../../helpers";
import styles from "./estado.module.scss";

function Estado({ estado }) {
    const [estadoCuenta, setEstadoCuenta] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);

    const onClick = () => {
        setLoading(true);
        const body = JSON.stringify(estadoCuenta);
        return fetch(`/api/estados`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body,
        }).then(() => setLoading(false));
    };

    const onChange = (id, categoria) => {
        const index = estadoCuenta.findIndex((item) => item.id === id);
        estadoCuenta[index] = { ...estadoCuenta[index], categoria };
        setEstadoCuenta(estadoCuenta);
    };

    useEffect(() => {
        setLoading(true);

        fetch(`/api/estados/${estado}`)
            .then((response) => response.json())
            .then((estadoCuenta) => {
                setEstadoCuenta(estadoCuenta);
                setLoading(false);
            });
    }, [estado]);
    useEffect(
        () =>
            fetch("/api/categorias")
                .then((res) => res.json())
                .then((categorias) => setCategorias(categorias)),
        []
    );

    if (!loading) {
        return (
            <div className="panel is-primary has-background-white">
                <p className="panel-heading">Estado de cuenta</p>
                <div>
                    {estadoCuenta.map((item, ix) => (
                        <Item key={item.id} ix={ix} {...item} categorias={categorias} onChange={onChange} />
                    ))}
                </div>
                <div className="level level-right py-4 px-5">
                    <button type="button" className="button is-primary" onClick={onClick}>
                        Guardar
                    </button>
                </div>
            </div>
        );
    } else {
        return <span>Loading</span>;
    }
}

function Item({ id, ix, fecha, debito, credito, descripcion, categoria, categorias, onChange }) {
    const [selectValue, setSelectValue] = useState(!!categoria ? categoria : "");
    const handleChange = (e) => {
        setSelectValue(e.target.value);
        onChange(id, e.target.value);
    };
    return (
        <div className={joinClassNames("panel-block", styles.row)}>
            <span className={styles.field}>{ix}</span>
            <span className={styles.field}>{fecha}</span>
            <span className={joinClassNames(styles.field, styles.descripcion)}>{descripcion}</span>
            <span className={joinClassNames(styles.field, styles.debito)}>{!!debito && debito}</span>
            <span className={joinClassNames(styles.field, styles.credito)}>{!!credito && credito}</span>
            <div className={joinClassNames(styles.field, styles.categoria)}>
                <div className="control">
                    <div className="select is-small">
                        <select name="categoria" id="categoria" value={selectValue} onChange={handleChange}>
                            <option value={""}>{}</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Estado;
