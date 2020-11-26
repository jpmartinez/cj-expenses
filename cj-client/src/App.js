import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Caja from "./components/caja/Caja";
import Estados from "./components/estados/Estados";
import Home from "./components/home/Home";
import IngresarEstado from "./components/ingresar-estado/IngresarEstado";
import Menu from "./components/menu/Menu";

function App() {
    return (
        <Router>
            <Menu />
            <section className="section ">
                <Switch>
                    <Route path="/caja">
                        <Caja />
                    </Route>
                    <Route path="/upload">
                        <IngresarEstado />
                    </Route>
                    <Route path="/estados">
                        <Estados />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </section>
        </Router>
    );
}

export default App;
