const router = require("express").Router();

const isAuthenticated = require ("../middlewares/isAuthenticated")


router.get("/", (req, res, next) => {
  res.json("All good in here"); //no se renderiza información, sólo se envía json
});

//rutas de SignUp LogIn Autenticaciones 
const authRoutes = require ("./auth.routes")
router.use("/auth", authRoutes)

const medicxRoutes = require ("./medicx.routes")
router.use("/medicx", isAuthenticated, medicxRoutes)

const clienteRoutes = require ("./cliente.routes") 
router.use("/cliente", isAuthenticated, clienteRoutes)

const publicRoutes = require ("./public.routes")
router.use("/public", publicRoutes)

const cloudinaryRoutes = require ("./cloudinary.routes")
router.use("/img", cloudinaryRoutes) // ¿ esta bien mandarlo a api?


module.exports = router;
