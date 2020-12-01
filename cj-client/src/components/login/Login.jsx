import { useState } from "react";
import { useHistory } from "react-router-dom";
import { fetch } from "../../helpers";
import { useForm } from "../../hooks";

function Login() {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    //eslint-disable-next-line
    const [onSubmit, onChange, reset, change, { fields, data }] = useForm(
        () => {
            setLoading(true);
            fetch.post(
                "/api/login",
                data,
                (a) => {
                    setLoading(false);
                    history.push("/");
                },
                (e) => {
                    setLoading(false);
                    console.error(e);
                }
            );
        },
        {
            usuario: "",
            password: "",
        }
    );

    return (
        <div className="panel is-primary">
            <p className="panel-heading">Login</p>
            {loading && <span>LOADING</span>}
            <form onSubmit={onSubmit} className="px-5 py-5 has-background-white">
                <fieldset>
                    <div className="field">
                        <label className="label">Usuario</label>
                        <div className="control">
                            <input
                                {...fields.usuario}
                                id="usuario"
                                className="input"
                                type="text"
                                placeholder="Usuario"
                                onChange={onChange}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input
                                {...fields.password}
                                id="password"
                                className="input"
                                type="password"
                                placeholder="Password"
                                onChange={onChange}
                            />
                        </div>
                    </div>

                    <button type="submit" className="button is-primary">
                        Login
                    </button>
                </fieldset>
            </form>
        </div>
    );
}

export default Login;
