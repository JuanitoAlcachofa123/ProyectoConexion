const express = require("express");
const conexion = require("./conexion");
const router = express.Router();

// USUARIOHABILIDAD
// Endpoint para crear una nueva relación UsuarioHabilidad
router.post('/usuarioHabilidad', (req, res) => {
    const nuevaRelacion = req.body;

    let sql = 'INSERT INTO UsuarioHabilidad SET ?';
    
    conexion.query(sql, nuevaRelacion, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al crear la relación UsuarioHabilidad' });
        } else {
            res.json({ mensaje: 'Relación UsuarioHabilidad creada exitosamente' });
        }
    });
});

// Endpoint para obtener todas las relaciones UsuarioHabilidad
router.get('/usuarioHabilidad', (req, res) => {
    let sql = 'SELECT * FROM UsuarioHabilidad';
    
    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al obtener las relaciones UsuarioHabilidad' });
        } else {
            res.json(result);
        }
    });
});

// Endpoint para actualizar la descripción de una relación UsuarioHabilidad por IDUsuario e IDHabilidad
router.put('/usuarioHabilidad/:idUsuario/:idHabilidad', (req, res) => {
    const idUsuario = req.params.idUsuario;
    const idHabilidad = req.params.idHabilidad;
    const nuevaDescripcion = req.body.descripcionUsuarioHabilidad;

    let sql = 'UPDATE UsuarioHabilidad SET descripcionUsuarioHabilidad = ? WHERE IDUsuario = ? AND IDHabilidad = ?';
    
    conexion.query(sql, [nuevaDescripcion, idUsuario, idHabilidad], (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al actualizar la descripción de la relación UsuarioHabilidad' });
        } else {
            if (result.affectedRows === 0) {
                res.json({ mensaje: 'Relación UsuarioHabilidad no encontrada' });
            } else {
                res.json({ mensaje: 'Descripción de la relación UsuarioHabilidad actualizada exitosamente' });
            }
        }
    });
});

// Endpoint para eliminar una relación UsuarioHabilidad por IDUsuario e IDHabilidad
router.delete('/usuarioHabilidad/:idUsuario/:idHabilidad', (req, res) => {
    const idUsuario = req.params.idUsuario;
    const idHabilidad = req.params.idHabilidad;

    let sql = 'DELETE FROM UsuarioHabilidad WHERE IDUsuario = ? AND IDHabilidad = ?';
    
    conexion.query(sql, [idUsuario, idHabilidad], (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al eliminar la relación UsuarioHabilidad' });
        } else {
            if (result.affectedRows === 0) {
                res.json({ mensaje: 'Relación UsuarioHabilidad no encontrada' });
            } else {
                res.json({ mensaje: 'Relación UsuarioHabilidad eliminada exitosamente' });
            }
        }
    });
});

module.exports = router;