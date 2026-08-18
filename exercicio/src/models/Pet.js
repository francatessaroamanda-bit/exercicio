const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true
    },

    especie: {
      type: String,
      required: true,
      trim: true
    },

    raca: {
      type: String,
      required: true,
      trim: true
    },

    dono: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Pet", petSchema);