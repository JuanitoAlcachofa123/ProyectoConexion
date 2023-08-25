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

module.exports = router;