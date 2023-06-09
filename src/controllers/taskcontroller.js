//Se requiere la conexion a la bd porque desde aqui se usaran los query
const pool = require('../db');

const allrows = async (req, res, next) => {
    try {
        // throw new Error('Algo paso xd sexo '); para verificar si el next funciona y envia el error al index
        const result = await pool.query('select * from Prueba1', (error, results) => {
            if (error) {
                throw error;
            }
            else {
                res.json(results.rows);
            }
        })
    } catch (error) {
        next(error);//Aqui se envia el error al index.js
    }

}
//el next es un error personalizado que se envia al router
const createtask = async (req, res, next) => {
    const { idu, nombreprueba } = req.body;
    try {
        const result = await pool.query('Insert into prueba1 (id, nombreprueba) values ($1,$2) RETURNING*  ', [
            idu,
            nombreprueba
        ]);
        console.log(result.rows);
        res.json(result.rows[0]);
    } catch (error) {
        next(error);//Aqui se envia el error al index.js
    }

}

//Editar registro que su id se envia por la URL es decir el req.params
const updatetask = async (req, res) => {
    const { id } = req.params;
    const { idu, nombreprueba } = req.body;
    const result = await pool.query('update prueba1 set id=$1, nombreprueba=$2 where ida=$3 RETURNING *', [
        idu,
        nombreprueba,
        id
    ]);
    //Si el resultado retornado tiene una longitud de 0 quiere decir que el id que se quiere editar no existe y devuelve un status 404 con un mensaje 
    if (result.rows.length === 0)
        return res.status(404).json({ message: "Task not found", });
    //si no exisitio errores retorna un json con el registro editado
    return res.json(result.rows[0]);
};
const deletetask = async (req, res) => {
    const { id } = req.params;

    const result = await pool.query('delete from prueba1 where ida=$1', [id]);

    //se usa rowcount y no lenght porque no retorna nada xd     
    if (result.rowCount === 0)
        return res.status(404).json({ message: "Task not found", });
    //si no exisitio errores retorna un json con el registro editado
    //no envia un json ni retorna el registro por que esta eliminado entonces envia un Estado 204 que significa que todo termino correctamente
    return res.sendStatus(204);
};
//obtener los datos de un solo registro
const taskdetails = async (req, res) => {
    const { id } = req.params;
    const result = await pool.query('select * from prueba1 where ida=$1', [id]);
    if (result.rows.length === 0) { return res.status(404).json({ message: "Task not found", }); }
    //si no exisitio errores retorna un json con el registro editado
    console.log(result.rows[0]);
    return res.json(result.rows[0]);

};
//Se exportan los controladores en forma de objeto
module.exports = {
    allrows,
    createtask,
    updatetask,
    deletetask,
    taskdetails
};