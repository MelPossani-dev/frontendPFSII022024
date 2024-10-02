import TelaCadastroMaquina from "./components/Telas/TelaCadastroMaquina";
import TelaCadastroFabricante from "./components/Telas/TelaCadastroFabricante";
import TelaMenu from "./components/Telas/TelaMenu";
import Tela404 from "./components/Telas/Tela404";
import TelaLogin from "./components/Telas/TelaLogin";
import TelaVenda from "./components/Telas/TelaVenda";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";



export const ContextoUsuarioLogado = createContext(null);

function App() {
  
  const [usuarioLogado, setUsuarioLogado] = useState({
    nome: "",
    logado: false,
    token: ""
  });

  return (
    !usuarioLogado.logado ? 
    <ContextoUsuarioLogado.Provider value={{ usuarioLogado, setUsuarioLogado }}>
      <TelaLogin />
    </ContextoUsuarioLogado.Provider> :
    <div className="App">
      <ContextoUsuarioLogado.Provider value={{ usuarioLogado, setUsuarioLogado }}>
        <BrowserRouter>
          <Routes>
            <Route path="/produto" element={<TelaCadastroMaquina />} />
            <Route path="/categoria" element={<TelaCadastroFabricante />} />
            <Route path="/pedido" element={<TelaVenda />} />
            <Route path="/login" element={<TelaLogin />} />
            <Route path="/" element={<TelaMenu />} />
            <Route path="*" element={<Tela404 />} />
          </Routes>
        </BrowserRouter>
      </ContextoUsuarioLogado.Provider>
    </div>
  );
}

export default App;
