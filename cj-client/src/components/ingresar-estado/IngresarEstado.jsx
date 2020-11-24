import { useState } from "react";
import Estado from "./estado/Estado";
import UploadForm from "./upload-form/UploadForm";

function IngresarEstado() {
    const [estado, setEstado] = useState("");

    return (
        <div className="container">
            <h1 className="title">Ingresar estado de cuenta</h1>
            <UploadForm setEstado={setEstado} />
            {!!estado && <Estado estado={estado} />}
        </div>
    );
}

export default IngresarEstado;
