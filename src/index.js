const express = require('express');
const morgan = require('morgan');
const taskrouter = require('./routes/router');
const cors = require("cors");


const app = express();
//Cors permite comunicar el server del bakend con el server del fronted de react
app.use(cors());

//para ver por consola el desarrollo
app.use(morgan('dev'));
//la app tiene que usar json para comunicarse con el cliente 
app.use(express.json());
//la app usara la rutas 
app.use(taskrouter);

//Middlewara de error para controlar los error del taskcontroller que se enviaran y este los mostrara
app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
})

app.listen('4000', () => console.log('server on port 4000'));