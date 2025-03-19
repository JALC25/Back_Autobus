const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Empresa = require('./Empresa');

const Chofer = sequelize.define('Chofer', {
    id_chofer: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    id_empresa: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    nombre: { 
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
    dni: { 
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true
    },
    telefono: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            isNumeric: { msg: "El teléfono solo debe contener números" },
            len: { args: [8, 8], msg: "El teléfono debe tener exactamente 8 caracteres" }
        }
    },
    licencia_conducir: { 
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true
    },
    fecha_contratacion: { 
        type: DataTypes.DATEONLY, 
        allowNull: false 
    }
}, {
    tableName: 'choferes',
    timestamps: false
});

// Relación con Empresa
Chofer.belongsTo(Empresa, { foreignKey: 'id_empresa' });
Empresa.hasMany(Chofer, { foreignKey: 'id_empresa' });

module.exports = Chofer;
