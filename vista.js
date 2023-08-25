const express = require("express");
const conexion = require("./conexion");
const router = express.Router();

//VISTAS:
router.get('/vista', (req, res) => {
    let sql = 'SELECT * FROM VistaIntercambios';
    
    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al obtener los datos de la vista VistaIntercambios' });
        } else {
            res.json(result);
        }
    });
});

module.exports = router;