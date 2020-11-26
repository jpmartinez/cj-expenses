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
                    <Route path="/admin/upload">
                        <IngresarEstado />
                    </Route>
                    <Route path="/admin/estados">
                        <Estados />
                    </Route>
                    <Route path="/admin">
                        <Home />
                    </Route>
                    <Route path="/">
                        <Caja />
                    </Route>
                </Switch>
            </section>
        </Router>
    );
}

export default App;
