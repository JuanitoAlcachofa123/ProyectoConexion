const express = require("express");
const app = express();
app.use(express.json());

// Importa los módulos de las rutas
const usuariosRouter = require("./usuarios");
const calificacionesRouter = require("./calificaciones");
const habilidadesRouter = require("./habilidades");
const usuarioHabilidadRouter = require("./usuariohabilidad");
const intercambiosRouter = require("./intercambios");
const vistaRouter = require("./vista");

// Usa los módulos de las rutas
app.use(usuariosRouter);
app.use(calificacionesRouter);
app.use(habilidadesRouter);
app.use(usuarioHabilidadRouter);
app.use(intercambiosRouter);
app.use(vistaRouter);

app.listen(3000, () => {
    console.log('Servidor OK en puerto 3000');
});