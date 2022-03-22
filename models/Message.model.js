const { Schema, model } = require("mongoose");

let messageSchema = new Schema(
  {
    sender: {
      ref: "MedModel",
      type: Schema.Types.ObjectId,
    },
    text: String,
    chatId: {
      ref: "Chat",
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

let Message = model("Message", messageSchema);

module.exports = Message;