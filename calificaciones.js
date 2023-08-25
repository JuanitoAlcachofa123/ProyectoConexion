
const express = require("express");
const conexion = require("./conexion");
const router = express.Router();
//CALIFICACIONES
// Endpoint para crear una nueva calificación y comentario
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

// Endpoint para obtener todas las calificaciones y comentarios
router.get('/calificaciones', (req, res) => {
    let sql = 'SELECT * FROM CalificacionesComentarios';
    
    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al obtener las calificaciones y comentarios' });
        } else {
            res.json(result);
        }
    });
});

module.exports = router;