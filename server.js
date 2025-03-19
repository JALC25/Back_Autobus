require('dotenv').config(); // Carga las variables de entorno desde .env

const app = require('./app'); // Asegúrate de que en app.js se exporte la instancia de Express
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    // Autenticar y sincronizar la base de datos
    await sequelize.authenticate();
    await sequelize.sync(); // Crea las tablas si no existen
    console.log("Database connected");

    // Verificar que 'app' es la instancia de Express con el método 'listen'
    if (typeof app.listen !== 'function') {
      throw new Error("app.listen is not a function. Revisa la exportación de tu instancia de Express en app.js.");
    }

    // Iniciar el servidor HTTP
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database", error);
  }
};

startServer();