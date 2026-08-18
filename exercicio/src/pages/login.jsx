import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  function entrar(e) {
    e.preventDefault();

    // Login temporário
    if (usuario === "admin" && senha === "1234") {
      // Registra que o administrador está logado
      sessionStorage.setItem("adminLogado", "true");

      // Vai para a Home
      navigate("/", { replace: true });
    } else {
      alert("Usuário ou senha incorretos!");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">

        <h1>Mundo Pet</h1>

        <p>
          Login do Administrador
        </p>

        <form onSubmit={entrar}>

          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) =>
              setUsuario(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) =>
              setSenha(e.target.value)
            }
          />

          <button type="submit">
            Entrar
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;

