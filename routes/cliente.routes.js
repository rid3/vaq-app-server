const ClienteModel = require("../models/Cliente.model");
const MensajeModel = require("../models/Mensaje.model");

const router = require("express").Router();

router.get ("/perfilcli", (req,res,next) => {
    res.json("perfil cliente checked")

    //home privado donde le salen las citas que tiene (si llego), les mediques que se guardó
})

//editar su perfil 
router.patch ("/:id", async (req,res,next) => {
    const { id } = req.params

    const { nombre, pronombres, imgCl, medicxs } = req.body

    try {

        await ClienteModel.findByIdAndUpdate (id, { nombre, pronombres, imgCl, medicxs })
        res.json("Perfil cliente actualizado")
    } catch(err) {
        next(err)
    }
})

//borrar cuenta cliente
router.delete ("/:id", async (req, res, next) => {
    const { id } = req.params
    
    try {
        await ClienteModel.findByIdAndDelete(id)
        res.json("Cliente borrado")

    } catch (err) {
        next(err)
    }
})


//RUTA PARA MENSAJES -------------------------

router.post("/mensajes", async (req, res, next) => {
    const { mensaje } = req.body

    try {

        const response = await MensajeModel.create ({ mensaje })
        res.json(response)

    }catch(err) {
        next(err)
    }
})


module.exports = router;