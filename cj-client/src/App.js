import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./App.scss";
import Estados from "./components/estados/Estados";
import Home from "./components/home/Home";
import IngresarEstado from "./components/ingresar-estado/IngresarEstado";

function App() {
    return (
        <Router>
            <nav className="navbar has-background-primary" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img
                            src="https://bulma.io/images/bulma-logo.png"
                            alt="Bulma: Free, open source, and modern CSS framework based on Flexbox"
                            width="112"
                            height="28"
                        />
                    </a>
                </div>
                <div className="navbar-end mr-2">
                    <Link className="navbar-item" to="/">
                        Home
                    </Link>
                    <Link className="navbar-item" to="/upload">
                        Ingresar Estado
                    </Link>
                    <Link className="navbar-item" to="/estados">
                        Ver Estados
                    </Link>
                </div>
            </nav>
            <section className="section ">
                <Switch>
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
