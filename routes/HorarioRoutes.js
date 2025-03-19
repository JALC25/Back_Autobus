const express = require("express");
const router = express.Router();
const HorarioController = require("../controllers/HorarioController");

router.get("/", HorarioController.obtenerHorarios);
router.get("/:id", HorarioController.obtenerHorarioPorId);
router.post("/", HorarioController.crearHorario);
router.put("/:id", HorarioController.actualizarHorario);
router.delete("/:id", HorarioController.eliminarHorario);

module.exports = router;
