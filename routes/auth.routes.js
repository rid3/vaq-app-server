const router = require("express").Router();

const MedicxModel = require ("../models/Medicx.model");
const ClienteModel = require ("../models/Cliente.model")

const bcrypt = require ("bcrypt");

const jwt = require ("jsonwebtoken");

const isAuthenticated = require ("../middlewares/isAuthenticated")



//SIGN UP MEDICXS Y CLIENTES-----------------------------------------------------------------------------<
router.post("/signup/:type", async (req, res, next) => {

    const { type } = req.params

    //----todas las propiedades de ambos tipos de usuarios
    const { nombreCompleto, email, password, especializacion, capacitaciones, imgCapacitacion, provincia, ciudad, centroDeSalud, diasYhorario, atiendePor, imgMed, nombre, emailCliente, passwordCliente, imgCl, medicxs, pronombres, role, contacto } = req.body

  //VALIDADORES
  //Revisar que todos los campos estén llenos
  if (type === "medicx" && (!nombreCompleto || !email || !password || !especializacion || !capacitaciones) ) {
      res.status(400).json ( { errorMessage: "Todos los campos son obligatorios" } )
      return;
     } else if ( type === "cliente" && (!nombre || !emailCliente || !passwordCliente) ) {
         res.status(400).json( { errorMessage: "Todos los campos son obligatorios" } )
         return;
     }

     //Revisar los requisitos para la contraseña 
     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
     //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
     if (type === "medicx" && (!passwordRegex.test(password))) {
         res.status(400).json ( { errorMessage: "La contraseña no cumple con todos los requisitos. Mínimo 8 carácteres y al menos: una letra minúscula, una mayúscula, un número y un carácter especial." } )
     return;
        }
  
    if ( type === "cliente" &&  (!passwordRegex.test(passwordCliente))) {
        res.status(400).json ( { errorMessage: "La contraseña no cumple con todos los requisitos. Mínimo 8 carácteres y al menos: una letra minúscula, una mayúscula, un número y un carácter especial." } )
        return;
    }

    //Revisar que el mail tenga el formato correcto 
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    if ( type === "medicx" &&  ( !emailRegex.test(email)) ) {
        res.status(400).json( { errorMessage: "Revisa que tu mail tenga el formato correcto" } )
        return;
    }
    if ( type === "cliente" &&  ( !emailRegex.test(emailCliente)) ) {
        res.status(400).json( { errorMessage: "Revisa que tu mail tenga el formato correcto" } )
        return;
    }

    
    try {
        //Revisar que no exista un usuario con el mismo email
          let foundUser;
        if (type === "medicx") {
          foundUser = await MedicxModel.findOne({email})
            if(foundUser) {
                res.status(400).json ( { errorMessage: "Ya existe un medicx registradx on ese email :/" } )
                return;  
            }
        } else if (type === "cliente") { 
            foundUser = await ClienteModel.findOne({emailCliente})
            if(foundUser) {
                res.status(400).json ( { errorMessage: "Ya existe un cliente registradx con ese email :/" } )
                return;
            }
        }
       

        //SI SE APRUEBAN TODOS LOS REQUISITOS SE CREAN LOS USUARIOS
        //hashed passwords
        let hashedPassword;
        let hashedPasswordCliente;

        if ( type === "medicx") {
            const salt = await bcrypt.genSalt(10)
            hashedPassword = await bcrypt.hash(password, salt)   
        } else if ( type === "cliente") {
            const saltCliente = await bcrypt.genSalt(10)
            hashedPasswordCliente = await bcrypt.hash(passwordCliente, saltCliente)
        }
        
        //creación se usuarios en BD
        if (type === "medicx") {
            await MedicxModel.create({
                nombreCompleto,
                email,
                password: hashedPassword,
                especializacion,
                capacitaciones,
                imgCapacitacion,
                provincia,
                ciudad,
                centroDeSalud,
                diasYhorario,
                atiendePor,
                imgMed,
                role,
                contacto
            })
        } else if (type === "cliente") {
            await ClienteModel.create({
                nombre,
                pronombres,
                emailCliente,
                passwordCliente: hashedPasswordCliente,
                imgCl,
                medicxs,
                role
            })
        }
        //mensaje de que todo fue bien
        res.sendStatus(201).json() 

    } catch (err){
        next(err)
    }

})

//LOG IN -------------------------------------------------------


router.post ("/login/medicx", async (req,res,next) => {

    const { email, password } = req.body

    if ( !email || !password ) {
        res.status(400).json( { errorMessage: "LLenar todos los campos" } )
        return;
    }


    try {
        //Validar que el usuario exista
            foundUser = await MedicxModel.findOne({email})
              if(!foundUser) {
                  res.status(401).json ( { errorMessage: "Usuario no registrado" } )
                  return;  
              }

              passwordMatch = await bcrypt.compare(password, foundUser.password)
              if (!passwordMatch) {
                  res.status(401).json ( { errorMessage: "Contraseña incorrecta" } )
                  return;
              }

              payload = {
                _id: foundUser._id,
                email: foundUser.email,
                role: foundUser.role,
                nombreCompleto: foundUser.nombreCompleto  
            }

            authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                { algorithm: "HS256", expiresIn:"8h" }
            )

            res.status(200).json({ authToken  })

          } catch (err) {
              next(err)
          }


})

router.post ("/login/cliente", async (req,res,next) => {

    const { emailCliente, passwordCliente } = req.body

    if ( !emailCliente || !passwordCliente ) {
        res.status(400).json( { errorMessage: "LLenar todos los campos" } )
        return;
    }


    try {
        //Validar que el usuario exista
            foundUser = await ClienteModel.findOne({emailCliente})
              if(!foundUser) {
                  res.status(401).json ( { errorMessage: "Usuario no registrado" } )
                  return;  
              }

              passwordMatch = await bcrypt.compare(passwordCliente, foundUser.passwordCliente)
              if (!passwordMatch) {
                  res.status(401).json ( { errorMessage: "Contraseña incorrecta" } )
                  return;
              }

              payload = {
                _id: foundUser._id,
                email: foundUser.emailCliente,
                role: foundUser.role,
            
            }

            authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                { algorithm: "HS256", expiresIn:"8h" }
            )

            res.status(200).json({ authToken  })

          } catch (err) {
              next(err)
          }


})

//verifica si el usuario tiene un token valido cuando vuelva a la página
router.get("/verify", isAuthenticated, (req,res,next) =>{

    const userRole = req.payload.role

    const userId = req.payload._id
    

    //salió todo ok
    res.status(200).json( { userRole, userId } )
})




module.exports = router;