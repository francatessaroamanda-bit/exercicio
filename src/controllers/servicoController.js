const Servico = require("../models/Servico");

// ==========================================
// LISTAR SERVIÇOS
// ==========================================

async function listarServicos(req, res) {
  try {
    const servicos = await Servico.find()
      .sort({ nome: 1 });

    res.json(servicos);

  } catch (error) {
    console.error("Erro ao listar serviços:", error);

    res.status(500).json({
      mensagem: "Erro ao listar serviços."
    });
  }
}


// ==========================================
// CADASTRAR SERVIÇO
// ==========================================

async function cadastrarServico(req, res) {
  try {
    const {
      nome,
      descricao,
      preco
    } = req.body;

    if (!nome || !descricao || preco === undefined) {
      return res.status(400).json({
        mensagem: "Preencha todos os campos."
      });
    }

    const novoServico = await Servico.create({
      nome,
      descricao,
      preco
    });

    res.status(201).json(novoServico);

  } catch (error) {
    console.error("Erro ao cadastrar serviço:", error);

    res.status(500).json({
      mensagem: "Erro ao cadastrar serviço."
    });
  }
}


// ==========================================
// EDITAR SERVIÇO
// ==========================================

async function editarServico(req, res) {
  try {
    const { id } = req.params;

    const {
      nome,
      descricao,
      preco
    } = req.body;

    if (!nome || !descricao || preco === undefined) {
      return res.status(400).json({
        mensagem: "Preencha todos os campos."
      });
    }

    const servicoAtualizado =
      await Servico.findByIdAndUpdate(
        id,
        {
          nome,
          descricao,
          preco
        },
        {
          new: true,
          runValidators: true
        }
      );

    if (!servicoAtualizado) {
      return res.status(404).json({
        mensagem: "Serviço não encontrado."
      });
    }

    res.json(servicoAtualizado);

  } catch (error) {
    console.error("Erro ao editar serviço:", error);

    res.status(500).json({
      mensagem: "Erro ao editar serviço."
    });
  }
}


// ==========================================
// REMOVER SERVIÇO
// ==========================================

async function removerServico(req, res) {
  try {
    const { id } = req.params;

    const servicoRemovido =
      await Servico.findByIdAndDelete(id);

    if (!servicoRemovido) {
      return res.status(404).json({
        mensagem: "Serviço não encontrado."
      });
    }

    res.json({
      mensagem: "Serviço removido com sucesso."
    });

  } catch (error) {
    console.error("Erro ao remover serviço:", error);

    res.status(500).json({
      mensagem: "Erro ao remover serviço."
    });
  }
}


module.exports = {
  listarServicos,
  cadastrarServico,
  editarServico,
  removerServico
};