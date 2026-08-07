import { useState } from "react";

function Clientes() {

  const [clientes, setClientes] = useState([
    {
      nome: "Maria Silva",
      telefone: "(11) 99999-9999",
      email: "maria@email.com"
    }
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editando, setEditando] = useState(null);

  const [novoCliente, setNovoCliente] = useState({
    nome: "",
    telefone: "",
    email: ""
  });


  function cadastrarCliente(e) {
    e.preventDefault();

    setClientes([
      ...clientes,
      novoCliente
    ]);

    limparFormulario();
  }


  function editarCliente(index) {

    setEditando(index);

    setNovoCliente(clientes[index]);

    setMostrarFormulario(true);

  }


  function salvarEdicao(e) {

    e.preventDefault();

    const listaAtualizada = clientes.map((cliente, index) => {

      if (index === editando) {
        return novoCliente;
      }

      return cliente;

    });


    setClientes(listaAtualizada);

    limparFormulario();

  }


  function removerCliente(index) {

    const confirmar = window.confirm(
      "Deseja remover este cliente?"
    );

    if (confirmar) {

      const novaLista = clientes.filter(
        (_, i) => i !== index
      );

      setClientes(novaLista);

    }

  }


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

      <h1>👥 Clientes</h1>


      <button onClick={() => setMostrarFormulario(true)}>
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


        </form>

      )}



      <div className="pets-container">

        {clientes.map((cliente, index) => (

          <div className="pet-card" key={index}>

            <h2>{cliente.nome}</h2>

            <p>
              <span className="info-label">Telefone:</span> {cliente.telefone}
            </p>

            <p>
              <span className="info-label">Email:</span> {cliente.email}
            </p>


            <button onClick={() => editarCliente(index)}>
              Editar
            </button>


            <button onClick={() => removerCliente(index)}>
              Remover
            </button>


          </div>

        ))}

      </div>


    </div>

  );
}

export default Clientes;