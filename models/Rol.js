const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importa la conexión a la BD

const Rol = sequelize.define('Rol', {
    id_rol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isIn: [['Administrador', 'Usuario']] // Solo permite estos dos valores
        }
    }
}, {
    tableName: 'roles',
    timestamps: false
});

module.exports = Rol;
