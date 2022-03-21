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
    
    centroDeSalud: {
      type: String
    },
    
    diasYhorario: {
      type: String 
    },

    atiendePor: {
      type: String,
    },
    imgMed: {
      type: String
    },
    role: {
      type: String,
      default: "medicx"
    }

  },

  {
    //propiedades en bd: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const MedModel = model("MedModel", medSchema);

module.exports = MedModel;
