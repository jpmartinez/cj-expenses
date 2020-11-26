import { Link, useLocation } from "react-router-dom";
import { joinClassNames } from "../../helpers";
import logo from "./logo.png";
import styles from "./menu.module.scss";

function Menu({ children }) {
    const location = useLocation();
    const showLinks = location.pathname.includes("/admin");
    return (
        <nav className="navbar has-background-primary-dark" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <div className={joinClassNames(styles.logo, "navbar-item")} href="#">
                    <img src={logo} alt="Logo" />
                    <span>expenses</span>
                </div>
            </div>
            {showLinks && (
                <div className="navbar-end mr-2 ">
                    <Link className={joinClassNames("navbar-item ", styles.link)} to="/admin">
                        Home
                    </Link>
                    <Link className={joinClassNames("navbar-item ", styles.link)} to="/admin/upload">
                        Ingresar Estado
                    </Link>
                    <Link className={joinClassNames("navbar-item ", styles.link)} to="/admin/estados">
                        Ver Estados
                    </Link>
                </div>
            )}
        </nav>
    );
}

export default Menu;
