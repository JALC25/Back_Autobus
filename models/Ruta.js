const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Empresa = require("./Empresa");

const Ruta = sequelize.define("Ruta", {
  id_ruta: {
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
      notEmpty: { msg: "❌ El campo 'id_empresa' no puede estar vacío" },
    },
  },
  origen: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "❌ El campo 'origen' es obligatorio" },
      is: {
        args: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
        msg: "❌ El campo 'origen' solo debe contener letras y espacios",
      },
    },
  },
  destino: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "❌ El campo 'destino' es obligatorio" },
      is: {
        args: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
        msg: "❌ El campo 'destino' solo debe contener letras y espacios",
      },
    },
  },
  distancia: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: { msg: "❌ El campo 'distancia' debe ser un número válido" },
      min: {
        args: [1],
        msg: "❌ El campo 'distancia' debe ser mayor a 1 km",
      },
    },
  },
  duracion: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "❌ El campo 'duracion' es obligatorio" },
    },
  },
  precio_base: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: { msg: "❌ El campo 'precio_base' debe ser un número válido" },
      min: {
        args: [0],
        msg: "❌ El campo 'precio_base' no puede ser negativo",
      },
    },
  },
});

// Relación con la tabla Empresa
Ruta.belongsTo(Empresa, { foreignKey: "id_empresa" });

module.exports = Ruta;
