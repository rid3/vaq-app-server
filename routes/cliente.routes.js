const ClienteModel = require("../models/Cliente.model");
const MensajeModel = require("../models/Mensaje.model");

const router = require("express").Router();

router.get ("/perfilcli/:id", async (req,res,next) => {

    const {id} = req.params

    try {
        const response = await ClienteModel.findById(id)
        //console.log(response)
        res.json(response)

    } catch (err){
        next(err)
    }

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

router.post("/:id/guardar", async (req, res, next) => {

    try {

        const { id } = req.params

        //buscar el modelo del cliente para agregar al médicx
        const elCliente = await ClienteModel.findById(req.payload._id)

        await elCliente.updateOne( { $addToSet : { medicxs: id } } )

    } catch (err) {
        next(err)
    }



} )





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