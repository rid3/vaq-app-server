const router = require("express").Router();
const MedicxModel = require ("../models/Medicx.model")




//CHEQUEAR SI ESTA RUTA LA USO 
router.get("/perfilmed", (req, res, next) => {
    res.json("ruta perfil medicx checked")
})
//---------------------------------------------------

router.patch("/:id", async (req,res,next) => {
    const { id } = req.params
  
    const { nombreCompleto, especializacion, capacitaciones, imgCapacitacion , provincia, ciudad, centroDeSalud, diasYhorario, atiendePor, imgMed, contacto } = req.body

    try {
        await MedicxModel.findByIdAndUpdate(id, {nombreCompleto, especializacion, capacitaciones, imgCapacitacion, provincia, ciudad, centroDeSalud, diasYhorario, atiendePor, imgMed, contacto, imgCapacitacion})
        res.json("Perfil público actualizado")
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

module.exports = router;