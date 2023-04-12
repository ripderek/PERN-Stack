import { BrowserRouter, Routes, Route } from "react-router-dom";
import Taklist from "./components/taklist";
import Edittaks from "./components/edittaks";
import Createtask from "./components/createtask";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Taklist />} />
        {/*cuando se quiera editar se envia hacia el formulario para crear con el parametro de la id */}
        <Route path="/edit/:id" element={<Createtask />} />
        <Route path="/create" element={<Createtask />} />
      </Routes>
    </BrowserRouter>
  );
}
