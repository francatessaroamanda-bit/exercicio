const express = require("express");

const router = express.Router();

const {
  listarServicos,
  cadastrarServico,
  editarServico,
  removerServico
} = require("../controllers/servicoController");


// GET
router.get("/", listarServicos);


// POST
router.post("/", cadastrarServico);


// PUT
router.put("/:id", editarServico);


// DELETE
router.delete("/:id", removerServico);


module.exports = router;