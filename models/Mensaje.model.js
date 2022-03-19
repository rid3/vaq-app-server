const { Schema, model } = require ("mongoose");

const mensajeSchema = new Schema ({
    mensaje: {
        type: String
    },

    medicx: {
        type: Schema.Types.ObjectId,
        ref: "MedModel"
    },

    cliente: {
        type: Schema.Types.ObjectId,
        ref: "ClienteModel"
    }
})

const MensajeModel = model ("MensajeModel", mensajeSchema);

module.exports = MensajeModel;
