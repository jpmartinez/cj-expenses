import { useEffect, useState } from "react";
import "./App.css";
import { bancos, meses, monedas } from "./constantes";

function App() {
    const [cuentas, setCuentas] = useState([]);
    const [estados, setEstados] = useState([]);
    useEffect(
        () =>
            fetch("/cuentas")
                .then((res) => res.json())
                .then((cuentas) => setCuentas(cuentas)),
        []
    );
    useEffect(
        () =>
            fetch("/estados")
                .then((res) => res.json())
                .then((estados) => setEstados(estados)),
        []
    );
    return (
        <div className="App">
            <form action="/upload" method="post" encType="multipart/form-data">
                <input type="file" name="file" id="file" />
                <select name="banco" id="banco">
                    <option value={bancos.santander}>{bancos.santander}</option>
                    <option value={bancos.brou}>{bancos.brou}</option>
                </select>
                <select name="moneda" id="moneda">
                    <option value={monedas.peso}>{monedas.peso}</option>
                    <option value={monedas.dolar}>{monedas.dolar}</option>
                </select>
                <select name="cuenta" id="cuenta">
                    {cuentas.map((cuenta) => (
                        <option key={cuenta.id} value={cuenta.id}>
                            {cuenta.nombre}
                        </option>
                    ))}
                </select>
                <select name="moneda" id="moneda">
                    <option value={monedas.peso}>{monedas.peso}</option>
                    <option value={monedas.dolar}>{monedas.dolar}</option>
                </select>
                <select name="mes" id="mes">
                    {Object.values(meses).map((mes) => (
                        <option key={mes} value={mes}>
                            {mes}
                        </option>
                    ))}
                </select>
                <button type="submit">Upload</button>
            </form>
            <div>
                {estados.map((estado) => {
                    return (
                        <div>
                            <span>fecha:{estado.fecha}</span>
                            <span>descripcion:{estado.descripcion}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
