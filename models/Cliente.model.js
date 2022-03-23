const { Schema, model } = require("mongoose");

const clienteSchema = new Schema ({

    nombre: {
        type: String,
        required: true
    },

    pronombres: {
        type:  String
    },

    emailCliente: {
        type: String,
        required:true,
        unique: true
    },

    passwordCliente: {
        type: String,
        required: true,
    },

    imgCl: {
        type:String
    },

    medicxs: [{
        type: Schema.Types.ObjectId,
        ref: "MedModel"
    }],
    role: {
        type: String,
        default: "cliente"
    }

})

const ClienteModel = model("ClienteModel", clienteSchema);

module.exports = ClienteModel;




