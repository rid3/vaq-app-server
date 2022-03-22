
const isCliente = (req,res,next) => {
    if (req.payload.role === "cliente") {
         next()
    } else {
     return null 
    }
}


module.exports = isCliente

