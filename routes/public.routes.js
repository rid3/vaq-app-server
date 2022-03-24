const router = require("express").Router();

const MedicxModel = require ("../models/Medicx.model")

//Display de los perfiles de todes les mediques
router.get("/perfilesmed", async (req,res,next) => {

    try {
        const response = await MedicxModel.find()
        res.json(response)

    } catch (err){
        next(err)
    }
})

//Display de detalles del perfil del médique clikeade
router.get("/details/:id", async (req,res,next) => {

    const { id } = req.params

    try {
        const response = await MedicxModel.findById(id)
        res.json(response)
   
    } catch (err) {
        next(err)
    }

})



module.exports = router;
