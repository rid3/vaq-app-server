const { Schema, model } = require("mongoose");


let chatSchema = new Schema(
  {
    participants: [
      {
        ref: "MedModel",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

let Chat = model("Chat", chatSchema);

module.exports = Chat;
