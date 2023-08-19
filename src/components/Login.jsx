import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Login.css";

function Login() {
  const [correo, setCorreo] = useState();
  const [contraseña, setContraseña] = useState();
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (correo !== "" && contraseña !== "") {
      const Usuario = {
        correo: correo,
        contraseña: contraseña,
      };
      setLoading(true);
      await axios
        .post("http://localhost:4000/login", Usuario)
        .then((res) => {
          const { data } = res;
          setMensaje(data.mensaje);
          setTimeout(() => {
            setMensaje("");
            localStorage.setItem("token", data?.usuario.token);
            navigate(`/`);
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
          setMensaje("Correo u contraseña incorrecta");
          setTimeout(() => {
            setMensaje("");
          }, 1500);
        });
      setLoading(false);
    }
  };

  return (
    <div className="container-login">
      <h1>Login</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="login">
          <label>Correo</label>
          <input
            type="text"
            name=""
            id=""
            onChange={(e) => setCorreo(e.target.value)}
          />
          <label>Contraseña</label>
          <input
            type="password"
            name=""
            id=""
            onChange={(e) => setContraseña(e.target.value)}
          />
          <button type="submit">Inicia Sesion</button>
        </div>
      </form>
      {mensaje && <div>{mensaje}</div>}
    </div>
  );
}

export default Login;
