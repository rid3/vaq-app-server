const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here"); //no se renderiza información, sólo se envía json
});

//rutas de SignUp LogIn Autenticaciones 
const authRoutes = require ("./auth.routes")
router.use("/auth", authRoutes)

const medicxRoutes = require ("./medicx.routes")
router.use("/medicx", medicxRoutes)

const clienteRoutes = require ("./cliente.routes") 
router.use("/cliente", clienteRoutes)

const publicRoutes = require ("./public.routes")
router.use("/public", publicRoutes)


module.exports = router;
