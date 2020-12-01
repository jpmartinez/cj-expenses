import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { meses } from "../../../constantes";
import { fetch, joinClassNames } from "../../../helpers";
import styles from "./estado.module.scss";

function Estado({ estado }) {
    const [estadoCuenta, setEstadoCuenta] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const errorCallback = () => history.push("/login");

    const onClick = () => {
        setLoading(true);
        return fetch.put(`/api/estados`, estadoCuenta, () => setLoading(false), errorCallback);
    };

    const onChange = (id, field) => {
        const index = estadoCuenta.findIndex((item) => item.id === id);
        estadoCuenta[index] = { ...estadoCuenta[index], [`${field.name}`]: field.value };
        setEstadoCuenta(estadoCuenta);
    };

    useEffect(() => {
        setLoading(true);
        fetch.get(
            `/api/estados/${estado}`,
            (estadoCuenta) => {
                setEstadoCuenta(estadoCuenta);
                setLoading(false);
            },
            errorCallback
        );
    }, [estado]);

    useEffect(() => fetch.get("/api/categorias", (categorias) => setCategorias(categorias), errorCallback), []);

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

function Item({ id, ix, fecha, debito, credito, descripcion, categoria, categorias, onChange, mes }) {
    const [selectCategoria, setSelectCategoria] = useState(!!categoria ? categoria : "");
    const handleChangeCategoria = (e) => {
        setSelectCategoria(e.target.value);
        onChange(id, e.target);
    };
    const [selectMes, setSelectMes] = useState(mes);
    const handleChangeMes = (e) => {
        setSelectMes(e.target.value);
        onChange(id, e.target);
    };

    const monto = debito > 0 ? debito : credito;
    return (
        <div className={joinClassNames("panel-block", styles.row)}>
            <span className={styles.field}>{ix}</span>
            <span className={styles.field}>{fecha}</span>
            <span className={joinClassNames(styles.field, styles.descripcion)}>{descripcion}</span>
            <span className={joinClassNames(styles.field, debito > 0 ? styles.debito : styles.credito)}>{monto}</span>
            <div className={styles.field}>
                <div className="control">
                    <div className="select is-small">
                        <select name="mes" id="mes" value={selectMes} onChange={handleChangeMes}>
                            <option value={""}>{}</option>
                            {Object.values(meses).map((mes) => (
                                <option key={mes} value={mes}>
                                    {mes}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className={joinClassNames(styles.field, styles.categoria)}>
                <div className="control">
                    <div className="select is-small">
                        <select
                            name="categoria"
                            id="categoria"
                            value={selectCategoria}
                            onChange={handleChangeCategoria}
                        >
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
