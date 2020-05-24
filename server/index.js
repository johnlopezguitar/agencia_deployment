//importar expres
const express = require('express');
const path = require('path');
//import body-parser
const bodyParser = require('body-parser');
const routes = require('./routes');
const configs = require('./config/index');


//const db = require('./config/database'); 

require('dotenv').config({path: 'variables.env'})
/* probar si la base de datos esta bien conectada
db.authenticate()
 .then(()=> console.log('DB Conectada'))
 .catch(error => console.log(error));*/

//configurar expres
const app =  express();
//habilitar pug
app.set('view engine', 'pug');
//añadir las vistas
app.set('views', path.join(__dirname, './views'));
//cargar carpeta statica llama public
app.use(express.static('public'));
//validar si estamos en desarrollo o produccion
const config = configs[app.get('env')];
//creamos variable para elsitio web
app.locals.titulo = config.nombresitio;   
//muestra el año actual
app.use((req, res, next)=>{
      //crear nueva fecha
      const fecha = new Date();
      res.locals.fechaActual = fecha.getFullYear();
      res.locals.ruta = req.path;
      //res.locals.saludo = 'Hola';
     // console.log(res.locals);
      return next();
})
//ejecutamos el bodyparser

app.use(bodyParser.urlencoded({extended: true}));


//cargar rutas
app.use('/', routes())


/**puerto y host para la app */
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

app.listen( port, host, () =>{
      console.log('El servidor esta funcionando');
});

