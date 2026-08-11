import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Clientes from "./pages/Clientes";
import Pets from "./pages/Pets";
import Agendamentos from "./pages/Agendamentos";
import Servicos from "./pages/Servicos";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>

      <div className="layout">

        <Sidebar />

        <main className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/agendamentos" element={<Agendamentos />} />
            <Route path="/servicos" element={<Servicos />} />
            
          </Routes>
        </main>

      </div>

    </BrowserRouter>
  );
}

export default App;