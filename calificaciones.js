
const express = require("express");
const conexion = require("./conexion");
const router = express.Router();
//CALIFICACIONES
// Endpoint para crear una nueva calificación y comentario
router.post('/calificaciones', (req, res) => {
    const nuevaCalificacion = req.body;

    // Obtener el último ID de la tabla Intercambios
    let getLastIdQuery = "SELECT MAX(IDCalificacion) AS lastId FROM CalificacionesComentarios";
    conexion.query(getLastIdQuery, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error inesperado' });
        } else {
            let lastId = result[0].lastId || 0;
            nuevaCalificacion.idCalificacion = lastId + 1;

            let sql = 'INSERT INTO CalificacionesComentarios SET ?';
            conexion.query(sql, nuevaCalificacion, (err, result) => {
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

// Endpoint para eliminar una calificación y comentario por ID
router.delete('/calificaciones/:idCalificacion', (req, res) => {
    const idCalificacion = req.params.idCalificacion;

    let sql = 'DELETE FROM CalificacionesComentarios WHERE IDCalificacion = ?';
    
    conexion.query(sql, [idCalificacion], (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al eliminar la calificación y comentario' });
        } else {
            if (result.affectedRows === 0) {
                res.json({ mensaje: 'Calificación y comentario no encontrados' });
            } else {
                res.json({ mensaje: 'Calificación y comentario eliminados exitosamente' });
            }
        }
    });
});

// Endpoint para actualizar una calificación y comentario por ID
router.put('/calificaciones/:idCalificacion', (req, res) => {
    const idCalificacion = req.params.idCalificacion;
    const datosActualizados = req.body;

    let sql = 'UPDATE CalificacionesComentarios SET ? WHERE IDCalificacion = ?';
    
    conexion.query(sql, [datosActualizados, idCalificacion], (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al actualizar la calificación y comentario' });
        } else {
            if (result.affectedRows === 0) {
                res.json({ mensaje: 'Calificación y comentario no encontrados' });
            } else {
                res.json({ mensaje: 'Calificación y comentario actualizados exitosamente' });
            }
        }
    });
});
module.exports = router;