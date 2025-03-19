const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Ruta = require("./Ruta");
const Autobus = require("./Autobus");

const Horario = sequelize.define("Horario", {
  id_horario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_ruta: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Ruta,
      key: "id_ruta",
    },
    validate: {
      notEmpty: { msg: "❌ El campo 'id_ruta' es obligatorio" },
    },
  },
  id_bus: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Autobus,
      key: "id_bus",
    },
    validate: {
      notEmpty: { msg: "❌ El campo 'id_bus' es obligatorio" },
    },
  },
  fecha_salida: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: { msg: "❌ La 'fecha_salida' es obligatoria" },
    },
  },
  fecha_llegada: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: { msg: "❌ La 'fecha_llegada' es obligatoria" },
    },
  },
});

// Relación con otras tablas
Horario.belongsTo(Ruta, { foreignKey: "id_ruta" });
Horario.belongsTo(Autobus, { foreignKey: "id_bus" });

module.exports = Horario;
