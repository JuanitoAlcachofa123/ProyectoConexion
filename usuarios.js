const express = require("express");
const conexion = require("./conexion");
const router = express.Router();

// Endpoint para crear un nuevo usuario
router.post('/usuarios', (req, res) => {
    const nuevoUsuario = req.body;

    // Obtener el último ID de la tabla Usuarios
    let getLastIdQuery = "SELECT MAX(IDUsuario) AS lastId FROM Usuarios";
    conexion.query(getLastIdQuery, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error inesperado' });
        } else {
            let lastId = result[0].lastId || 0;
            nuevoUsuario.IDUsuario = lastId + 1;

            let insertQuery = 'INSERT INTO Usuarios SET ?';
            conexion.query(insertQuery, nuevoUsuario, (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.json({ mensaje: 'Error al crear el usuario' });
                } else {
                    res.json({ mensaje: 'Usuario creado exitosamente' });
                }
            });
        }
    });
});

// Endpoint para obtener todos los usuarios
router.get('/usuarios', (req, res) => {
    let sql = 'SELECT * FROM Usuarios';
    
    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al obtener usuarios' });
        } else {
            res.json(result);
        }
    });
});

module.exports = router;