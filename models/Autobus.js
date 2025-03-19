const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Empresa = require("./Empresa");
const Chofer = require("./Chofer");

const Autobus = sequelize.define("Autobus", {
  id_bus: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_empresa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Empresa,
      key: "id_empresa",
    },
    validate: {
      notNull: { msg: "El campo id_empresa es obligatorio" },
      isInt: { msg: "El id_empresa debe ser un número entero" },
    },
  },
  id_chofer: {
    type: DataTypes.INTEGER,
    allowNull: true, // Puede ser opcional
    references: {
      model: Chofer,
      key: "id_chofer",
    },
    validate: {
      isInt: { msg: "El id_chofer debe ser un número entero" },
    },
  },
  placa: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
    validate: {
      notNull: { msg: "La placa es obligatoria" },
      isAlphanumeric: { msg: "La placa solo puede contener letras y números" },
      len: {
        args: [6, 10],
        msg: "La placa debe tener entre 6 y 10 caracteres",
      },
    },
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "La capacidad es obligatoria" },
      isInt: { msg: "La capacidad debe ser un número entero" },
      min: {
        args: [10],
        msg: "La capacidad debe ser al menos 10 asientos",
      },
      max: {
        args: [100],
        msg: "La capacidad no puede ser mayor a 100 asientos",
      },
    },
  },
});

Autobus.belongsTo(Empresa, { foreignKey: "id_empresa", onDelete: "CASCADE" });
Autobus.belongsTo(Chofer, { foreignKey: "id_chofer", onDelete: "SET NULL" });

module.exports = Autobus;
