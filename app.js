const express = require('express');
const sequelize = require('./config/database');
const cors = require("cors");
// agregar rutas y Asegúrar de que la ruta es correcta
const rolRoutes = require('./routes/rolRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const empresaRoutes = require('./routes/empresaRoutes');
const choferRoutes = require('./routes/choferRoutes');
const autobusRoutes = require("./routes/autobusRoutes");
const rutaRoutes = require("./routes/RutaRoutes");
const horarioRoutes = require("./routes/HorarioRoutes");
const asientoRoutes = require("./routes/asientoRoutes");
const transaccionRoutes = require('./routes/transaccionRoutes'); 

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:8081" }));
// Sincronizar la base de datos
sequelize.sync()
    .then(() => console.log('Conectado a MySQL y tablas sincronizadas'))
    .catch(err => console.log(err));


// Definir rutas
app.use('/roles', rolRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/clientes', clienteRoutes);
app.use('/empresas', empresaRoutes);
app.use('/choferes', choferRoutes);
app.use('/api/', autobusRoutes);
app.use("/rutas", rutaRoutes);
app.use("/horarios", horarioRoutes);
app.use("/asientos", asientoRoutes);
app.use('/transacciones', transaccionRoutes);

// Iniciar el servidor
app.listen(3001, () => console.log('Servidor corriendo en el puerto 3001'));


