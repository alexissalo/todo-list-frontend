import CardList from "../components/CardList";
import FormCard from "../components/FormCard";
import styles from "../styles/ItemListContainer.css";
import { useContext } from "react";
import { TasksContext } from "../context/ListContext";
import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ItemListContainer() {
  const [tasks, setTasks] = useState();
  const token = localStorage.getItem("token");
  const navigate=useNavigate()

  useEffect(()=>{
    if(!token){
      navigate("/login")
    }
  },[])

  useEffect(() => {
    fetchTasks();
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    }
  };
  return (
    <div className="itemlistcontainer">
      <div className="formcontainer">
        <FormCard />
      </div>
      <div className="itemlist" style={styles.itemlist}>
        {tasks ? (
          tasks.map((item) => (
            <CardList
              title={item.titulo}
              description={item.descripcion}
              id={item._id}
              date={item.fecha}
            />
          ))
        ) : (
          <h1>aaaaa</h1>
        )}
      </div>
    </div>
  );
}

export default ItemListContainer;
