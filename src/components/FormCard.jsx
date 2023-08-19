import "../styles/FormCard.css";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function FormCard() {
  const [title, setTitle] = useState();
  const [description,setDescription]=useState()
  const [userId,setUserId]=useState()
  const todayDate = new Date().toISOString().slice(0, 10);
  const [mensaje,setMensaje]=useState()
  const [loading,setLoading]=useState()
  const token = localStorage.getItem("token");
  const navigate = useNavigate();


  const handleSubmit = async(e) => {
    e.preventDefault();
    if (title !== "" && description !== "") {
      const Tarea = {
        titulo:title,
        descripcion:description,
        fecha:todayDate,
        userId:userId,
      };
      console.log(Tarea)
      setLoading(true);
      await axios
        .post("http://localhost:4000/tasks", Tarea)
        .then((res) => {
          const { data } = res;
          setMensaje(data.mensaje);
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

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:4000/user`, {
          headers: {
            token: token,
          },
        })
        .then(({ data }) => setUserId(data._id))
        .catch((error) => console.error(error));
    }
  }, [token]);
  return (
    <div className="formcard">
      <h2>AGREGA UNA TAREA</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e)=>setTitle(e.target.value)}/>
        <textarea name="" id="" cols="30" rows="10" required onChange={(e)=>setDescription(e.target.value)}></textarea>
        <button type="submit">Agregar</button>
      </form>
      {mensaje && <div>{mensaje}</div>}
    </div>
  );
}

export default FormCard;
