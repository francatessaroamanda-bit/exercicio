import { useEffect, useState } from "react";

function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [editando, setEditando] = useState(null);

  const [novoAgendamento, setNovoAgendamento] = useState({
    pet: "",
    servico: "",
    data: "",
    horario: "",
    status: "Pendente"
  });

  // ==========================================
  // HORÁRIOS DE FUNCIONAMENTO
  // ==========================================

  const horariosFuncionamento = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00"
  ];

  // ==========================================
  // DATA DE HOJE
  // ==========================================

  function obterDataHoje() {
    const hoje = new Date();

    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
  }

  const dataHoje = obterDataHoje();

  // ==========================================
  // BUSCAR AGENDAMENTOS
  // ==========================================

  useEffect(() => {
    buscarAgendamentos();
  }, []);

  async function buscarAgendamentos() {
    try {
      const resposta = await fetch(
        "http://localhost:5000/api/agendamentos"
      );

      if (!resposta.ok) {
        throw new Error("Erro ao buscar agendamentos");
      }

      const dados = await resposta.json();

      setAgendamentos(dados);
    } catch (error) {
      console.error(error);

      alert("Não foi possível carregar os agendamentos.");
    }
  }

  // ==========================================
  // VERIFICAR SE HORÁRIO ESTÁ OCUPADO
  // ==========================================

  function horarioOcupado(horario) {
    if (!novoAgendamento.data) {
      return false;
    }

    return agendamentos.some((agendamento) => {
      const mesmoDia =
        agendamento.data === novoAgendamento.data;

      const mesmoHorario =
        agendamento.horario === horario;

      const outroAgendamento =
        agendamento._id !== editando;

      return (
        mesmoDia &&
        mesmoHorario &&
        outroAgendamento
      );
    });
  }

  // ==========================================
  // VERIFICAR SE HORÁRIO JÁ PASSOU
  // ==========================================

  function horarioJaPassou(horario) {
    if (novoAgendamento.data !== dataHoje) {
      return false;
    }

    const agora = new Date();

    const [hora, minuto] = horario.split(":");

    const horarioSelecionado = new Date();

    horarioSelecionado.setHours(
      Number(hora),
      Number(minuto),
      0,
      0
    );

    return horarioSelecionado <= agora;
  }

  // ==========================================
  // VERIFICAR HORÁRIO INDISPONÍVEL
  // ==========================================

  function horarioIndisponivel(horario) {
    return (
      horarioOcupado(horario) ||
      horarioJaPassou(horario)
    );
  }

  // ==========================================
  // CADASTRAR AGENDAMENTO
  // POST
  // ==========================================

  async function cadastrarAgendamento(e) {
    e.preventDefault();

    if (
      !novoAgendamento.pet ||
      !novoAgendamento.servico ||
      !novoAgendamento.data ||
      !novoAgendamento.horario
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    // Verificação antes de enviar
    if (horarioOcupado(novoAgendamento.horario)) {
      alert(
        "Esse horário já está ocupado. Escolha outro horário."
      );

      return;
    }

    if (horarioJaPassou(novoAgendamento.horario)) {
      alert(
        "Esse horário já passou. Escolha outro horário."
      );

      return;
    }

    try {
      const resposta = await fetch(
        "http://localhost:5000/api/agendamentos",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(novoAgendamento)
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(
          dados.mensagem ||
            "Erro ao cadastrar agendamento"
        );

        return;
      }

      setAgendamentos([
        ...agendamentos,
        dados
      ]);

      alert("Agendamento realizado com sucesso!");

      limparFormulario();

    } catch (error) {
      console.error(error);

      alert("Erro ao conectar com o servidor.");
    }
  }

  // ==========================================
  // PREPARAR EDIÇÃO
  // ==========================================

  function editarAgendamento(agendamento) {
    setEditando(agendamento._id);

    setNovoAgendamento({
      pet: agendamento.pet,
      servico: agendamento.servico,
      data: agendamento.data,
      horario: agendamento.horario,
      status: agendamento.status
    });

    setMostrarFormulario(true);
  }

  // ==========================================
  // SALVAR EDIÇÃO
  // PUT
  // ==========================================

  async function salvarEdicao(e) {
    e.preventDefault();

    if (
      !novoAgendamento.pet ||
      !novoAgendamento.servico ||
      !novoAgendamento.data ||
      !novoAgendamento.horario
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    if (horarioOcupado(novoAgendamento.horario)) {
      alert(
        "Esse horário já está ocupado por outro agendamento."
      );

      return;
    }

    if (horarioJaPassou(novoAgendamento.horario)) {
      alert(
        "Esse horário já passou. Escolha outro horário."
      );

      return;
    }

    try {
      const resposta = await fetch(
        `http://localhost:5000/api/agendamentos/${editando}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(novoAgendamento)
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(
          dados.mensagem ||
            "Erro ao editar agendamento"
        );

        return;
      }

      setAgendamentos(
        agendamentos.map((agendamento) =>
          agendamento._id === editando
            ? dados
            : agendamento
        )
      );

      alert("Agendamento alterado com sucesso!");

      limparFormulario();

    } catch (error) {
      console.error(error);

      alert("Erro ao conectar com o servidor.");
    }
  }

  // ==========================================
  // REMOVER AGENDAMENTO
  // DELETE
  // ==========================================

  async function removerAgendamento(id) {
    const confirmar = window.confirm(
      "Deseja remover este agendamento?"
    );

    if (!confirmar) {
      return;
    }

    try {
      const resposta = await fetch(
        `http://localhost:5000/api/agendamentos/${id}`,
        {
          method: "DELETE"
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(
          dados.mensagem ||
            "Erro ao remover agendamento"
        );

        return;
      }

      setAgendamentos(
        agendamentos.filter(
          (agendamento) =>
            agendamento._id !== id
        )
      );

      alert("Agendamento removido com sucesso!");

    } catch (error) {
      console.error(error);

      alert("Erro ao conectar com o servidor.");
    }
  }

  // ==========================================
  // LIMPAR FORMULÁRIO
  // ==========================================

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

  // ==========================================
  // NOVO AGENDAMENTO
  // ==========================================

  function novoAgendamentoFormulario() {
    setEditando(null);

    setNovoAgendamento({
      pet: "",
      servico: "",
      data: "",
      horario: "",
      status: "Pendente"
    });

    setMostrarFormulario(true);
  }

  // ==========================================
  // SEPARAR HISTÓRICO
  // ==========================================

  const agendamentosFuturos = agendamentos.filter(
    (agendamento) =>
      agendamento.data >= dataHoje
  );

  const historico = agendamentos.filter(
    (agendamento) =>
      agendamento.data < dataHoje ||
      agendamento.status === "Finalizado"
  );

  return (
    <div>

      <h1>Agendamentos</h1>

      <button onClick={novoAgendamentoFormulario}>
        + Novo Agendamento
      </button>

      {/* =====================================
          FORMULÁRIO
      ====================================== */}

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

          {/* DATA */}

          <input
            type="date"
            min={dataHoje}
            value={novoAgendamento.data}
            onChange={(e) => {
              setNovoAgendamento({
                ...novoAgendamento,
                data: e.target.value,
                horario: ""
              });
            }}
          />

          {/* HORÁRIO */}

          <select
            value={novoAgendamento.horario}
            onChange={(e) =>
              setNovoAgendamento({
                ...novoAgendamento,
                horario: e.target.value
              })
            }
            disabled={!novoAgendamento.data}
          >

            <option value="">
              {!novoAgendamento.data
                ? "Escolha primeiro a data"
                : "Escolha um horário"}
            </option>

            {horariosFuncionamento.map(
              (horario) => {

                const ocupado =
                  horarioIndisponivel(horario);

                return (
                  <option
                    key={horario}
                    value={horario}
                    disabled={ocupado}
                  >
                    {horario}
                    {horarioOcupado(horario)
                      ? " - Ocupado"
                      : horarioJaPassou(horario)
                      ? " - Horário encerrado"
                      : " - Disponível"}
                  </option>
                );
              }
            )}

          </select>

          {/* STATUS */}

          <select
            value={novoAgendamento.status}
            onChange={(e) =>
              setNovoAgendamento({
                ...novoAgendamento,
                status: e.target.value
              })
            }
          >

            <option value="Pendente">
              Pendente
            </option>

            <option value="Confirmado">
              Confirmado
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

      {/* =====================================
          AGENDAMENTOS
      ====================================== */}

      <h2>Agendamentos</h2>

      <div className="pets-container">

        {agendamentosFuturos.length === 0 ? (

          <p>
            Nenhum agendamento encontrado.
          </p>

        ) : (

          agendamentosFuturos.map(
            (agendamento) => (

              <div
                className="pet-card"
                key={agendamento._id}
              >

                <h2>
                  {agendamento.pet}
                </h2>

                <p>
                  <span className="info-label">
                    Serviço:
                  </span>{" "}
                  {agendamento.servico}
                </p>

                <p>
                  <span className="info-label">
                    Data:
                  </span>{" "}
                  {agendamento.data}
                </p>

                <p>
                  <span className="info-label">
                    Horário:
                  </span>{" "}
                  {agendamento.horario}
                </p>

                <p>
                  <span className="info-label">
                    Status:
                  </span>{" "}
                  {agendamento.status}
                </p>

                <button
                  onClick={() =>
                    editarAgendamento(
                      agendamento
                    )
                  }
                >
                  Editar
                </button>

                <button
                  onClick={() =>
                    removerAgendamento(
                      agendamento._id
                    )
                  }
                >
                  Remover
                </button>

              </div>

            )
          )

        )}

      </div>

      {/* =====================================
          HISTÓRICO
      ====================================== */}



      <div className="pets-container">

        {historico.length === 0 ? (

          <p>
            
          </p>

        ) : (

          historico.map(
            (agendamento) => (

              <div
                className="pet-card"
                key={agendamento._id}
              >

                <h2>
                  {agendamento.pet}
                </h2>

                <p>
                  <span className="info-label">
                    Serviço:
                  </span>{" "}
                  {agendamento.servico}
                </p>

                <p>
                  <span className="info-label">
                    Data:
                  </span>{" "}
                  {agendamento.data}
                </p>

                <p>
                  <span className="info-label">
                    Horário:
                  </span>{" "}
                  {agendamento.horario}
                </p>

                <p>
                  <span className="info-label">
                    Status:
                  </span>{" "}
                  {agendamento.status}
                </p>

                <button
                  onClick={() =>
                    removerAgendamento(
                      agendamento._id
                    )
                  }
                >
                  Remover
                </button>

              </div>

            )
          )

        )}

      </div>

    </div>
  );
}

export default Agendamentos;