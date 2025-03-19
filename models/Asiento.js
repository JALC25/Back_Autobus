const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Horario = require("./Horario");
const Autobus = require("./Autobus");

const Asiento = sequelize.define("Asiento", {
  id_asiento: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  id_horario: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: { model: Horario, key: "id_horario" },
    validate: {
      notNull: { msg: "El campo 'id_horario' es obligatorio" },
      isInt: { msg: "El 'id_horario' debe ser un número válido" },
    },
  },
  id_bus: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: { model: Autobus, key: "id_bus" },
    validate: {
      notNull: { msg: "El campo 'id_bus' es obligatorio" },
      isInt: { msg: "El 'id_bus' debe ser un número válido" },
    },
  },
  numero_asiento: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    unique: true,
    validate: {
      notNull: { msg: "El número de asiento es obligatorio" },
      isInt: { msg: "El 'número_asiento' debe ser un número válido" },
      min: { args: [1], msg: "El número de asiento debe ser mayor a 0" }
    },
  },
  estado: { 
    type: DataTypes.ENUM("Disponible", "Ocupado", "Reservado"), 
    allowNull: false,
    defaultValue: "Disponible",
    validate: {
      notNull: { msg: "El campo 'estado' es obligatorio" },
      isIn: {
        args: [["Disponible", "Ocupado", "Reservado"]],
        msg: "El 'estado' solo puede ser 'Disponible', 'Ocupado' o 'Reservado'",
      }
    },
  }
});

// Relaciones
Asiento.belongsTo(Horario, { foreignKey: "id_horario", as: "Horario" });
Asiento.belongsTo(Autobus, { foreignKey: "id_bus", as: "Autobus" });

module.exports = Asiento;
