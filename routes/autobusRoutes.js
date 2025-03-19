const express = require("express");
const AutobusController = require("../controllers/autobusController");

const router = express.Router();

// Obtener todos los autobuses
router.get("/autobuses", AutobusController.obtenerAutobuses);

// Obtener un autobús por ID
router.get("/autobuses/:id", AutobusController.obtenerAutobusPorId);

// Crear un nuevo autobús
router.post("/autobuses", AutobusController.crearAutobus);

// Actualizar un autobús
router.put("/autobuses/:id", AutobusController.actualizarAutobus);

// Eliminar un autobús
router.delete("/autobuses/:id", AutobusController.eliminarAutobus);

module.exports = router;
