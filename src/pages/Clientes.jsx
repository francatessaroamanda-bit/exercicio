import { useEffect, useState } from "react";

function Clientes() {

  const [clientes, setClientes] = useState([]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [editando, setEditando] = useState(null);

  const [novoCliente, setNovoCliente] = useState({
    nome: "",
    telefone: "",
    email: ""
  });


  // ============================
  // BUSCAR CLIENTES DO MONGODB
  // ============================

  useEffect(() => {
    buscarClientes();
  }, []);


  async function buscarClientes() {

    try {

      const resposta = await fetch(
        "http://localhost:5000/api/clientes"
      );

      if (!resposta.ok) {
        throw new Error("Erro ao buscar clientes");
      }

      const dados = await resposta.json();

      setClientes(dados);

    } catch (error) {

      console.error(error);

      alert("Não foi possível carregar os clientes.");

    }

  }


  // ============================
  // CADASTRAR CLIENTE
  // POST
  // ============================

  async function cadastrarCliente(e) {

    e.preventDefault();

    if (
      !novoCliente.nome ||
      !novoCliente.telefone ||
      !novoCliente.email
    ) {

      alert("Preencha todos os campos.");

      return;
    }


    try {

      const resposta = await fetch(
        "http://localhost:5000/api/clientes",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(novoCliente)
        }
      );


      const dados = await resposta.json();


      if (!resposta.ok) {

        alert(dados.mensagem || "Erro ao cadastrar cliente");

        return;
      }


      // Adiciona o cliente retornado pelo MongoDB
      setClientes([dados, ...clientes]);


      limparFormulario();


    } catch (error) {

      console.error(error);

      alert("Erro ao conectar com o servidor.");

    }

  }


  // ============================
  // PREPARAR EDIÇÃO
  // ============================

  function editarCliente(cliente) {

    setEditando(cliente._id);

    setNovoCliente({
      nome: cliente.nome,
      telefone: cliente.telefone,
      email: cliente.email
    });

    setMostrarFormulario(true);

  }


  // ============================
  // SALVAR EDIÇÃO
  // PUT
  // ============================

  async function salvarEdicao(e) {

    e.preventDefault();


    if (
      !novoCliente.nome ||
      !novoCliente.telefone ||
      !novoCliente.email
    ) {

      alert("Preencha todos os campos.");

      return;
    }


    try {

      const resposta = await fetch(
        `http://localhost:5000/api/clientes/${editando}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(novoCliente)
        }
      );


      const dados = await resposta.json();


      if (!resposta.ok) {

        alert(dados.mensagem || "Erro ao editar cliente");

        return;
      }


      // Atualiza o cliente na tela
      setClientes(
        clientes.map((cliente) =>
          cliente._id === editando
            ? dados
            : cliente
        )
      );


      limparFormulario();


    } catch (error) {

      console.error(error);

      alert("Erro ao conectar com o servidor.");

    }

  }


  // ============================
  // REMOVER CLIENTE
  // DELETE
  // ============================

  async function removerCliente(id) {

    const confirmar = window.confirm(
      "Deseja remover este cliente?"
    );


    if (!confirmar) {
      return;
    }


    try {

      const resposta = await fetch(
        `http://localhost:5000/api/clientes/${id}`,
        {
          method: "DELETE"
        }
      );


      const dados = await resposta.json();


      if (!resposta.ok) {

        alert(dados.mensagem || "Erro ao remover cliente");

        return;
      }


      // Remove da tela
      setClientes(
        clientes.filter(
          (cliente) => cliente._id !== id
        )
      );


    } catch (error) {

      console.error(error);

      alert("Erro ao conectar com o servidor.");

    }

  }


  // ============================
  // LIMPAR FORMULÁRIO
  // ============================

  function limparFormulario() {

    setNovoCliente({
      nome: "",
      telefone: "",
      email: ""
    });

    setEditando(null);

    setMostrarFormulario(false);

  }


  return (

    <div>

      <h1>Clientes</h1>


      <button
        onClick={() => {
          setEditando(null);

          setNovoCliente({
            nome: "",
            telefone: "",
            email: ""
          });

          setMostrarFormulario(true);
        }}
      >
        + Novo Cliente
      </button>


      {mostrarFormulario && (

        <form
          onSubmit={
            editando !== null
              ? salvarEdicao
              : cadastrarCliente
          }
          className="formulario"
        >


          <input
            type="text"
            placeholder="Nome do cliente"
            value={novoCliente.nome}
            onChange={(e) =>
              setNovoCliente({
                ...novoCliente,
                nome: e.target.value
              })
            }
          />


          <input
            type="text"
            placeholder="Telefone"
            value={novoCliente.telefone}
            onChange={(e) =>
              setNovoCliente({
                ...novoCliente,
                telefone: e.target.value
              })
            }
          />


          <input
            type="email"
            placeholder="E-mail"
            value={novoCliente.email}
            onChange={(e) =>
              setNovoCliente({
                ...novoCliente,
                email: e.target.value
              })
            }
          />


          <button type="submit">

            {editando !== null
              ? "Salvar Alterações"
              : "Salvar Cliente"}

          </button>


          <button
            type="button"
            onClick={limparFormulario}
          >
            Cancelar
          </button>


        </form>

      )}


      <div className="pets-container">

        {clientes.map((cliente) => (

          <div
            className="pet-card"
            key={cliente._id}
          >

            <h2>{cliente.nome}</h2>


            <p>
              <span className="info-label">
                Telefone:
              </span>{" "}
              {cliente.telefone}
            </p>


            <p>
              <span className="info-label">
                Email:
              </span>{" "}
              {cliente.email}
            </p>


            <button
              onClick={() => editarCliente(cliente)}
            >
              Editar
            </button>


            <button
              onClick={() => removerCliente(cliente._id)}
            >
              Remover
            </button>


          </div>

        ))}

      </div>


    </div>

  );

}

export default Clientes;