const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Rol = require('./Rol'); // Importamos el modelo Rol

const Usuario = sequelize.define('Usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_rol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Rol,
            key: 'id_rol'
        }
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo_electronico: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'usuarios',
    timestamps: false
});

// Relación: Un usuario pertenece a un rol
Usuario.belongsTo(Rol, { foreignKey: 'id_rol' });

module.exports = Usuario;
