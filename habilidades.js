const express = require("express");
const conexion = require("./conexion");
const router = express.Router();

// HABILIDADES
// Endpoint para crear una nueva habilidad

router.post('/habilidades', (req, res) => {
    const nuevaHabilidad = req.body;

    // Obtener el último ID de la tabla Usuarios
    let getLastIdQuery = "SELECT MAX(IDHabilidad) AS lastId FROM Habilidades";
    conexion.query(getLastIdQuery, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error inesperado' });
        } else {
            let lastId = result[0].lastId || 0;
            nuevaHabilidad.IDHabilidad = lastId + 1;

            let insertQuery = 'INSERT INTO Habilidades SET ?';
            conexion.query(insertQuery, nuevaHabilidad, (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.json({ mensaje: 'Error al crear la habilidad' });
                } else {
                    res.json({ mensaje: 'Habilidad creada exitosamente' });
                }
            });
        }
    });
});

// Endpoint para obtener todas las habilidades
router.get('/habilidades', (req, res) => {
    let sql = 'SELECT * FROM Habilidades';
    
    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al obtener las habilidades' });
        } else {
            res.json(result);
        }
    });
});

module.exports = router;