const Pet = require("../models/Pet");

// LISTAR PETS
async function listarPets(req, res) {
  try {
    const pets = await Pet.find().sort({ createdAt: -1 });

    res.status(200).json(pets);
  } catch (error) {
    console.error("Erro ao listar pets:", error);

    res.status(500).json({
      mensagem: "Erro ao buscar pets"
    });
  }
}


// CADASTRAR PET
async function cadastrarPet(req, res) {
  try {
    const { nome, especie, raca, dono } = req.body;

    if (!nome || !especie || !raca || !dono) {
      return res.status(400).json({
        mensagem: "Nome, espécie, raça e dono são obrigatórios"
      });
    }

    const novoPet = await Pet.create({
      nome,
      especie,
      raca,
      dono
    });

    res.status(201).json(novoPet);

  } catch (error) {
    console.error("Erro ao cadastrar pet:", error);

    res.status(500).json({
      mensagem: "Erro ao cadastrar pet"
    });
  }
}


// EDITAR PET
async function editarPet(req, res) {
  try {
    const { id } = req.params;
    const { nome, especie, raca, dono } = req.body;

    if (!nome || !especie || !raca || !dono) {
      return res.status(400).json({
        mensagem: "Nome, espécie, raça e dono são obrigatórios"
      });
    }

    const petAtualizado = await Pet.findByIdAndUpdate(
      id,
      {
        nome,
        especie,
        raca,
        dono
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!petAtualizado) {
      return res.status(404).json({
        mensagem: "Pet não encontrado"
      });
    }

    res.status(200).json(petAtualizado);

  } catch (error) {
    console.error("Erro ao editar pet:", error);

    res.status(500).json({
      mensagem: "Erro ao editar pet"
    });
  }
}


// REMOVER PET
async function removerPet(req, res) {
  try {
    const { id } = req.params;

    const petRemovido = await Pet.findByIdAndDelete(id);

    if (!petRemovido) {
      return res.status(404).json({
        mensagem: "Pet não encontrado"
      });
    }

    res.status(200).json({
      mensagem: "Pet removido com sucesso"
    });

  } catch (error) {
    console.error("Erro ao remover pet:", error);

    res.status(500).json({
      mensagem: "Erro ao remover pet"
    });
  }
}


module.exports = {
  listarPets,
  cadastrarPet,
  editarPet,
  removerPet
};