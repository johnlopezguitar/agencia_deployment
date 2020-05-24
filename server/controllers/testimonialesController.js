
const Testimonial = require('../models/Testimoniales');


exports.mostrarTestimoniales = async (req, res) => {
    const testimoniales = await Testimonial.findAll()
    res.render ('testimoniales',{
      pagina: 'Testimoniales',
      testimoniales
})
    }


exports.agregarTestimonial = async (req, res) => {
          
    // validar ue todos los campos esten llenos
     let {nombre, correo, mensaje} = req.body
       console.log(req.body);  
     let errores = [];
     if(!nombre){
         errores.push({'mensaje' : 'Agrega tu Nombre'})
       }

     if(!correo){
         errores.push({'mensaje' : 'Agrega tu Correo'})
       }

     if(!mensaje){
         errores.push({'mensaje' : 'Agrega tu Mensaje'})
       }

         //REVISAR POR ERRORES
     if(errores.length > 0){
         //muestrala vista con errores
         const testimoniales = await Testimoniales.findAll()
         res.render('testimoniales',{
             errores,
             nombre,
             correo,
             mensaje
         })

     }     else{
         //almacenamineto de datos en  la BD
         Testimonial.create({
           nombre,
           correo,
           mensaje
      })
        .then( testimonial => res.redirect('/testimoniales'))
        .catch(error => console.log(error));
  }
}