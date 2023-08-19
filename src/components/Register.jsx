import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

function Register() {
  const [nombre,setNombre]=useState()
  const [correo,setCorreo]=useState()
  const [contraseña,setContraseña]=useState()
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (nombre !== "" && contraseña !== "" && correo !== "") {
      const Usuario = {
        nombre:nombre,
        correo:correo,
        contraseña:contraseña,
      };
      setLoading(true);
      await axios
        .post("http://localhost:4000/register", Usuario)
        .then((res) => {
          const { data } = res;
          setMensaje(data.mensaje);
          setTimeout(() => {
            setMensaje("");
            navigate("/login");
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
          setMensaje("Hubo un error");
          setTimeout(() => {
            setMensaje("");
          }, 1500);
        });

      setLoading(false);
    }
  };

  return (
    <div className="container-register">
      <h1>Register</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="register">
          <label>Nombre</label>
          <input type="text" name="" id="" required onChange={(e) => setNombre(e.target.value)}/>
          <label>Correo</label>
          <input type="email" name="" id="" required onChange={(e) => setCorreo(e.target.value)}/>
          <label>Contraseña</label>
          <input type="password" name="" id="" required onChange={(e) => setContraseña(e.target.value)}/>
          <button type="submit">Registrarse</button>
        </div>
      </form>
      {mensaje && <div>{mensaje}</div>}
    </div>
  );
}

export default Register;
