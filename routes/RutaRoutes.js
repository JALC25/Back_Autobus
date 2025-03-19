const express = require("express");
const router = express.Router();
const RutaController = require("../controllers/RutaController");

router.get("/", RutaController.obtenerRutas);
router.get("/:id", RutaController.obtenerRutaPorId);
router.post("/", RutaController.crearRuta);
router.put("/:id", RutaController.actualizarRuta);
router.delete("/:id", RutaController.eliminarRuta);

module.exports = router;
