import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { colores, meses } from "../../constantes";
import { fetch, joinClassNames, roundTwoDecimals } from "../../helpers";
import styles from "./home.module.scss";

function Home() {
    const [gastos, setGastos] = useState([]);
    const mes = Object.values(meses)[new Date().getMonth()];
    const history = useHistory();
    const errorCallback = () => history.push("/login");

    useEffect(
        () =>
            fetch.get(
                `/api/reportes/gastos-mes?mes=${mes}`,
                (report) =>
                    setGastos(
                        report
                            .filter((g) => !!g.monto)
                            .map((g) => ({
                                name: g.categoria,
                                value: roundTwoDecimals(g.monto),
                            }))
                    ),
                errorCallback
            ),
        [mes]
    );
    return (
        <div className="container">
            <h1 className="title">{mes}</h1>
            <div className={joinClassNames("panel has-background-white px-4 py-4", styles.gastos)}>
                {!!gastos.length ? <Chart data={gastos} /> : <SinGastos />}
                {!!gastos.length && <Totales gastos={gastos} />}
            </div>
        </div>
    );
}

function Chart({ data }) {
    return (
        <ResponsiveContainer width="80%" height="100%" minHeight={500}>
            <PieChart>
                <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={data}
                    innerRadius={100}
                    outerRadius={200}
                    fill="#8884d8"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
                    ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
}

function SinGastos() {
    return (
        <div className="container py-4 ">
            <p>No hay gastos para este mes</p>
        </div>
    );
}

function Totales({ gastos }) {
    return (
        <div className={joinClassNames("container", styles.totales)}>
            <p className="title">Total</p>
            <p className="subtitle">{roundTwoDecimals(gastos.reduce((res, k) => (res += k.value), 0))}</p>
        </div>
    );
}

export default Home;
