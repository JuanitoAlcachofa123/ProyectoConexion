const express = require("express");
const conexion = require("./conexion");
const router = express.Router();

//REPORTE GENERAL DE LO MAS IMPORTANTE
router.get('/vista/general', (req, res) => {
    let sql = 'SELECT * FROM VistaIntercambios';
    
    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al obtener los datos de los reportes Generales' });
        } else {
            res.json(result);
        }
    });
});
//REPORTE DE HABILIDADES JUNTO A USUARIOS
router.get('/vista/usuarios', (req, res) => {
    let sql = 'select * from VistaUsuariosHabilidades;';
    
    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al obtener los datos de los reportes Generales' });
        } else {
            res.json(result);
        }
    });
});

//REPORTE DE USUARIOS ACTIVOS
router.get('/vista/usuarios/activos', (req, res) => {
    let sql = 'select * from VistaUsuariosActivos;';
    
    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al obtener los datos de los reportes Generales' });
        } else {
            res.json(result);
        }
    });
});

//REPORTE DE USUARIOS INACTIVOS
router.get('/vista/usuarios/inactivos', (req, res) => {
    let sql = 'select * from VistaUsuariosInactivos;';
    
    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al obtener los datos de los reportes Generales' });
        } else {
            res.json(result);
        }
    });
});

//REPORTE DE USUARIOS SIN INTERCAMBIOS
router.get('/vista/usuarios/sin/intercambios', (req, res) => {
    let sql = 'select * from UsuariosSinIntercambios;';
    
    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al obtener los datos de los reportes Generales' });
        } else {
            res.json(result);
        }
    });
});


module.exports = router;