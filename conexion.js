const mysql = require("mysql2");

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jhonalex1238',
    database: 'habilidades'
});

conexion.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

module.exports = conexion;