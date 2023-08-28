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

// Endpoint para actualizar un usuario por ID
router.put('/usuarios/:idUsuario', (req, res) => {
    const idUsuario = req.params.idUsuario;
    const datosActualizados = req.body;

    let sql = 'UPDATE Usuarios SET ? WHERE IDUsuario = ?';
    
    conexion.query(sql, [datosActualizados, idUsuario], (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al actualizar el usuario' });
        } else {
            res.json({ mensaje: 'Usuario actualizado exitosamente' });
        }
    });
});

// Endpoint para eliminar un usuario por ID
router.delete('/usuarios/:idUsuario', (req, res) => {
    const idUsuario = req.params.idUsuario;

    let sql = 'DELETE FROM Usuarios WHERE IDUsuario = ?';
    
    conexion.query(sql, [idUsuario], (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'No se puede eliminar usuarios' });
        } else {
            if (result.affectedRows === 0) {
                res.json({ mensaje: 'Usuario no encontrado' });
            } else {
                res.json({ mensaje: 'Usuario eliminado exitosamente' });
            }
        }
    });
});

module.exports = router;