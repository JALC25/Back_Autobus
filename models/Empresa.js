const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Empresa = sequelize.define('Empresa', {
    id_empresa: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    nombre_empresa: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            notEmpty: { msg: "El nombre no puede estar vacío" },
            is: {
                args: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/u,
                msg: "El nombre solo debe contener letras y espacios"
            }
        }
    },
    direccion: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    telefono_contacto: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            isNumeric: { msg: "El teléfono solo debe contener números" },
            len: { args: [8, 8], msg: "El teléfono debe tener exactamente 8 dígitos" }
        }
    },
    email_contacto: { 
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: "Debe ser un correo válido" }
        }
    }
}, {
    tableName: 'empresas',
    timestamps: false
});

module.exports = Empresa;
