const router = require("express").Router();

router.get ("/perfilcli", (req,res,next) => {
    res.json("perfil cliente checked")
})


module.exports = router;