const router = require("express").Router();
const MedicxModel = require ("../models/Medicx.model")
const MensajeModel = require ("../models/Mensaje.model")




router.get("/perfilmed", (req, res, next) => {
    res.json("ruta perfil medicx checked")

     //perfo bienvenidx y reglas 
    //esta sería la página home privada con el link a crear el perfil público 
})

//Crear/editar y que el se haga público (patch porque enrealidad estamos editando, no?)
router.patch("/:id", async (req,res,next) => {
    const { id } = req.params
   //cloudinary: debería poner imgCapacitacion: req.file.path => pero no me encuentra el path 
    const { nombreCompleto, especializacion, capacitaciones, imgCapacitacion , provincia, ciudad, centroDeSalud, diasYhorario, atiendePor, imgMed, contacto } = req.body

    try {
        await MedicxModel.findByIdAndUpdate(id, {nombreCompleto, especializacion, capacitaciones, imgCapacitacion, provincia, ciudad, centroDeSalud, diasYhorario, atiendePor, imgMed, contacto, imgCapacitacion})
        res.json("Perfil público actualizado")
        console.log(req.body) //para chequear img
    } catch (err) {
        next(err)
    }
})

//Borrar cuenta
router.delete("/:id", async (req, res, next) => {
    const { id } = req.params

    try {

        await MedicxModel.findByIdAndDelete(id)
        res.json("Medicx borrado")

    } catch (err) {
        next (err)
    }
})

//RUTAS PARA CREAR MENSAJES -----------------------------

router.post ("/mensajes", async (req,res,next) => {

    const { mensaje } = req.body

    try {

        const response = await MensajeModel.create ({ mensaje })
        res.json(response)

    } catch(err) {
        next(err)
    }

})





module.exports = router;