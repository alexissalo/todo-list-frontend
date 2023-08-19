import styles from "../styles/CardList.css";
import ClearIcon from "@mui/icons-material/Clear";
import { Edit } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";

function CardList({ title, description, id, date}) {
  const [titulo, setTitulo] = useState();
  const [descripcion, setDescripcion] = useState();
  const [isEditShowing, setIsEditShowing] = useState(false);

  const deleteTask = async (taskId) => {
    console.log(taskId);
    try {
      await axios.delete(`http://localhost:4000/tasks/${taskId}`);
    } catch (error) {
      console.error("Error al borrar la tarea:", error);
    }
  };

  const editTask = async (taskId, updatedData) => {
    try {
      await axios.put(`http://localhost:4000/tasks/${taskId}`, updatedData);
    } catch (error) {
      console.error("Error al editar la tarea:", error);
    }
  };

  const handleSubmit=(e) => {
    e.preventDefault();
    const updatedData = {
      titulo: titulo,
      descripcion: descripcion,
    };
    editTask(id, updatedData);
    setIsEditShowing(!isEditShowing)
  }

  return (
    <div className="cardlist" style={styles.cardlist}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <div onClick={() => setIsEditShowing(!isEditShowing)}>
          <Edit style={{ cursor: "pointer" }} />
        </div>
        <div onClick={() => deleteTask(id)}>
          <ClearIcon style={{ cursor: "pointer" }} />
        </div>
      </div>
      {isEditShowing ? (
        <div>
          <form onSubmit={handleSubmit}>
            <input type="text" name="" id="" onChange={(e)=>setTitulo(e.target.value)}/>
            <textarea name="" id="" cols="30" rows="10" onChange={(e)=>setDescripcion(e.target.value)}></textarea>
            <div>
              <button onClick={()=>setIsEditShowing(!isEditShowing)}>Cancelar</button>
              <button type="submit">Aceptar</button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <div>
            <h2 style={{ textAlign: "left", overflow: "auto" }}>{title}</h2>
          </div>
          <div>
            <h4 style={{ textAlign: "left", overflow: "auto" }}>
              {description}
            </h4>
          </div>
          <small>{date}</small>
        </div>
      )}
    </div>
  );
}

export default CardList;
