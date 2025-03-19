const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
    id_cliente: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    nombre_completo: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "El nombre no puede estar vacío"
            },
            is: {
                args: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/u,
                msg: "El nombre solo debe contener letras y espacios"
            }
        }
    }
}, {
    tableName: 'clientes',
    timestamps: false
});

module.exports = Cliente;
