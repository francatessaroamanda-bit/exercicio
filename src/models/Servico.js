const mongoose = require("mongoose");

const servicoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true
    },

    descricao: {
      type: String,
      required: true,
      trim: true
    },

    preco: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Servico", servicoSchema);