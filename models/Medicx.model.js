const { Schema, model } = require("mongoose");


const medSchema = new Schema(
  {
    nombreCompleto: {
      type: String,
      required : true
    },
    
    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    especializacion: {
      type: String,
      required: true

    },

    capacitaciones: {
      type: String,
      required: true
    },

    imgCapacitacion: {
      type: String,
    },

    provincia: {
      type: String
    },

    ciudad: {
      type: String
    },

    guardias: {
      centroDeSalud: String,
      diasYhorario: String 
    },

    atiendePor: {
      type: String,
      enum: ["obraSocial", "particular", "ambos"]
    },
    imgMed: {
      type: String
    }

  },

  {
    //propiedades en bd: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const MedModel = model("MedModel", medSchema);

module.exports = MedModel;
