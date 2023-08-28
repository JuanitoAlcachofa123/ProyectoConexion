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

// Endpoint para eliminar una habilidad por ID
router.delete('/habilidades/:idHabilidad', (req, res) => {
    const idHabilidad = req.params.idHabilidad;

    let sql = 'DELETE FROM Habilidades WHERE IDHabilidad = ?';
    
    conexion.query(sql, [idHabilidad], (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al eliminar la habilidad' });
        } else {
            if (result.affectedRows === 0) {
                res.json({ mensaje: 'Habilidad no encontrada' });
            } else {
                res.json({ mensaje: 'Habilidad eliminada exitosamente' });
            }
        }
    });
});

// Endpoint para actualizar una habilidad por ID
router.put('/habilidades/:idHabilidad', (req, res) => {
    const idHabilidad = req.params.idHabilidad;
    const datosActualizados = req.body;

    let sql = 'UPDATE Habilidades SET ? WHERE IDHabilidad = ?';
    
    conexion.query(sql, [datosActualizados, idHabilidad], (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al actualizar la habilidad' });
        } else {
            if (result.affectedRows === 0) {
                res.json({ mensaje: 'Habilidad no encontrada' });
            } else {
                res.json({ mensaje: 'Habilidad actualizada exitosamente' });
            }
        }
    });
});

module.exports = router;