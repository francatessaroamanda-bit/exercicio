const Agendamento = require("../models/Agendamento");

// =====================================
// LISTAR AGENDAMENTOS
// =====================================

async function listarAgendamentos(req, res) {
  try {
    const agendamentos = await Agendamento.find()
      .sort({ data: 1, horario: 1 });

    res.json(agendamentos);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensagem: "Erro ao buscar agendamentos"
    });
  }
}


// =====================================
// CADASTRAR AGENDAMENTO
// =====================================

async function cadastrarAgendamento(req, res) {
  try {
    const {
      pet,
      servico,
      data,
      horario,
      status
    } = req.body;


    if (!pet || !servico || !data || !horario) {
      return res.status(400).json({
        mensagem: "Preencha todos os campos."
      });
    }


    // =====================================
    // VERIFICAR SE O HORÁRIO JÁ ESTÁ OCUPADO
    // =====================================

    const horarioOcupado = await Agendamento.findOne({
      data: data,
      horario: horario
    });


    if (horarioOcupado) {
      return res.status(409).json({
        mensagem: "Este horário já está ocupado. Escolha outro horário."
      });
    }


    // =====================================
    // CRIAR AGENDAMENTO
    // =====================================

    const novoAgendamento = await Agendamento.create({
      pet,
      servico,
      data,
      horario,
      status: status || "Pendente"
    });


    res.status(201).json(novoAgendamento);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensagem: "Erro ao cadastrar agendamento."
    });
  }
}


// =====================================
// EDITAR AGENDAMENTO
// =====================================

async function editarAgendamento(req, res) {
  try {

    const { id } = req.params;

    const {
      pet,
      servico,
      data,
      horario,
      status
    } = req.body;


    if (!pet || !servico || !data || !horario) {
      return res.status(400).json({
        mensagem: "Preencha todos os campos."
      });
    }


    // =====================================
    // VERIFICAR SE O HORÁRIO JÁ PERTENCE
    // A OUTRO AGENDAMENTO
    // =====================================

    const horarioOcupado = await Agendamento.findOne({
      data: data,
      horario: horario,
      _id: { $ne: id }
    });


    if (horarioOcupado) {
      return res.status(409).json({
        mensagem: "Este horário já está ocupado. Escolha outro horário."
      });
    }


    const agendamentoAtualizado =
      await Agendamento.findByIdAndUpdate(
        id,
        {
          pet,
          servico,
          data,
          horario,
          status
        },
        {
          new: true,
          runValidators: true
        }
      );


    if (!agendamentoAtualizado) {
      return res.status(404).json({
        mensagem: "Agendamento não encontrado."
      });
    }


    res.json(agendamentoAtualizado);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensagem: "Erro ao editar agendamento."
    });
  }
}


// =====================================
// REMOVER AGENDAMENTO
// =====================================

async function removerAgendamento(req, res) {

  try {

    const { id } = req.params;

    const agendamentoRemovido =
      await Agendamento.findByIdAndDelete(id);


    if (!agendamentoRemovido) {
      return res.status(404).json({
        mensagem: "Agendamento não encontrado."
      });
    }


    res.json({
      mensagem: "Agendamento removido com sucesso."
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensagem: "Erro ao remover agendamento."
    });
  }
}


module.exports = {
  listarAgendamentos,
  cadastrarAgendamento,
  editarAgendamento,
  removerAgendamento
};