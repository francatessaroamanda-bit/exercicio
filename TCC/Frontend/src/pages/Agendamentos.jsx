import { useState } from "react";

function Agendamentos() {

  const [agendamentos, setAgendamentos] = useState([
    {
      pet: "Thor",
      servico: "Banho e Tosa",
      data: "10/08/2026",
      horario: "09:00",
      status: "Confirmado"
    },
    {
      pet: "Luna",
      servico: "Banho",
      data: "10/08/2026",
      horario: "14:00",
      status: "Pendente"
    }
  ]);


  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editando, setEditando] = useState(null);


  const [novoAgendamento, setNovoAgendamento] = useState({
    pet: "",
    servico: "",
    data: "",
    horario: "",
    status: "Pendente"
  });



  function cadastrarAgendamento(e) {

    e.preventDefault();


    setAgendamentos([
      ...agendamentos,
      novoAgendamento
    ]);


    limparFormulario();

  }



  function editarAgendamento(index) {

    setEditando(index);

    setNovoAgendamento({
      ...agendamentos[index]
    });

    setMostrarFormulario(true);

  }



  function salvarEdicao(e) {

    e.preventDefault();


    const listaAtualizada = agendamentos.map((agenda, index) => {

      if (index === editando) {
        return novoAgendamento;
      }

      return agenda;

    });


    setAgendamentos(listaAtualizada);

    limparFormulario();

  }



  function removerAgendamento(index) {

    const confirmar = window.confirm(
      "Deseja remover este agendamento?"
    );


    if (confirmar) {

      const novaLista = agendamentos.filter(
        (_, i) => i !== index
      );


      setAgendamentos(novaLista);

    }

  }



  function limparFormulario() {

    setNovoAgendamento({
      pet: "",
      servico: "",
      data: "",
      horario: "",
      status: "Pendente"
    });


    setEditando(null);

    setMostrarFormulario(false);

  }



  return (

    <div>

      <h1>📅 Agendamentos</h1>


      <button onClick={() => setMostrarFormulario(true)}>
        + Novo Agendamento
      </button>



      {mostrarFormulario && (

        <form 
          className="formulario"
          onSubmit={
            editando !== null
              ? salvarEdicao
              : cadastrarAgendamento
          }
        >


          <input
            type="text"
            placeholder="Nome do pet"
            value={novoAgendamento.pet}
            onChange={(e) =>
              setNovoAgendamento({
                ...novoAgendamento,
                pet: e.target.value
              })
            }
          />


          <input
            type="text"
            placeholder="Serviço"
            value={novoAgendamento.servico}
            onChange={(e) =>
              setNovoAgendamento({
                ...novoAgendamento,
                servico: e.target.value
              })
            }
          />


          <input
            type="date"
            value={novoAgendamento.data}
            onChange={(e) =>
              setNovoAgendamento({
                ...novoAgendamento,
                data: e.target.value
              })
            }
          />


          <input
            type="time"
            value={novoAgendamento.horario}
            onChange={(e) =>
              setNovoAgendamento({
                ...novoAgendamento,
                horario: e.target.value
              })
            }
          />


          <select
            value={novoAgendamento.status}
            onChange={(e) =>
              setNovoAgendamento({
                ...novoAgendamento,
                status: e.target.value
              })
            }
          >

            <option>
              Pendente
            </option>

            <option>
              Confirmado
            </option>

            <option>
              Finalizado
            </option>

          </select>


          <button type="submit">

            {editando !== null
              ? "Salvar Alterações"
              : "Salvar Agendamento"}

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

        {agendamentos.map((agenda, index) => (

          <div className="pet-card" key={index}>


            <h2>{agenda.pet}</h2>

            <p>
              <span className="info-label">Serviço:</span> {agenda.servico}
            </p>

            <p>
              <span className="info-label">Data:</span> {agenda.data}
            </p>

            <p>
              <span className="info-label">Horário:</span> {agenda.horario}
            </p>

            <p>
              <span className="info-label">Status:</span> {agenda.status}
            </p>


            <button onClick={() => editarAgendamento(index)}>
              Editar
            </button>


            <button onClick={() => removerAgendamento(index)}>
              Remover
            </button>


          </div>

        ))}


      </div>


    </div>

  );

}

export default Agendamentos;