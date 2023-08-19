import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ItemListContainer from "./containers/ItemListContainer";
import TasksContextProvider from "./context/ListContext";
import Register from "./components/Register";
import Login from "./components/Login";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TasksContextProvider>
          <Navbar />
          <Routes>
            <Route exaxt path="/" element={<ItemListContainer />} />
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="/login" element={<Login/>}/>
          </Routes>
        </TasksContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
