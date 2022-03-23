
const router = require("express").Router();
const Chat = require("../models/Chat.model");
const Message = require("../models/Message.model");
const MedicxModel = require ("../models/Medicx.model")

// "/api/chat/users" to get a list of all users from the DB
router.get("/users", async (req, res, next) => {
  try {
    const response = await MedicxModel.find().select("nombreCompleto especializacion provincia")
    res.status(200).json(response)
  } catch(err) {
    next(err)
  }
})

//a les mediques les decimos user también 
router.post("/start/:userId", async (req, res, next) => {

    const { _id } = req.payload // usuario loggueado
    const { userId } = req.params // usuario con quien quiero chatear
  
    // Revisar si el chat entre los dos usuarios ya existe
    try {
      const foundChat = await Chat.findOne( { participants: { $all: [ _id, userId ] } } )
  
      if (foundChat) {
        res.json(foundChat)
      } else {
        const newChat = await Chat.create( { participants: [ _id, userId ] } )
        res.json(newChat)
      }
  
    } catch(err) {
      next(err)
    }
  
  })

  //ruta para buscar todos los mensajes 
  router.get("/messages/:chatId", async (req, res, next) => {

    const { chatId } = req.params
  
    try {
  
      const response = await Message.find({ chatId }).populate("sender")
      res.json(response)
  
    } catch(err) {
      next(err)
    }
  
  })
  


module.exports = router;