const express = require("express");
const conexion = require("./conexion");
const router = express.Router();

//INTERCAMBIOS
// Endpoint para crear un nuevo intercambio
// Endpoint para crear un nuevo intercambio
router.post('/intercambios', (req, res) => {
    const nuevoIntercambio = req.body;

    // Obtener el último ID de la tabla Intercambios
    let getLastIdQuery = "SELECT MAX(IDIntercambio) AS lastId FROM Intercambios";
    conexion.query(getLastIdQuery, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error inesperado' });
        } else {
            let lastId = result[0].lastId || 0;
            nuevoIntercambio.IDIntercambio = lastId + 1;

            let sql = 'INSERT INTO Intercambios SET ?';
            conexion.query(sql, nuevoIntercambio, (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.json({ mensaje: 'Error al crear el intercambio' });
                } else {
                    res.json({ mensaje: 'Intercambio creado exitosamente' });
                }
            });
        }
    });
});

// Endpoint para obtener todos los intercambios
router.get('/intercambios', (req, res) => {
    let sql = 'SELECT * FROM Intercambios';
    
    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al obtener los intercambios' });
        } else {
            res.json(result);
        }
    });
});

module.exports = router;