const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Horario = require('./Horario');
const Cliente = require('./Cliente');
const Bus = require('./Autobus');
const Ruta = require('./Ruta');
const Asiento = require('./Asiento');

const Transaccion = sequelize.define('Transaccion', {
    id_transaccion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_horario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Horario, key: 'id_horario' }
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: Cliente, key: 'id_cliente' }
    },
    id_bus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Bus, key: 'id_bus' }
    },
    id_ruta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Ruta, key: 'id_ruta' }
    },
    id_asiento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Asiento, key: 'id_asiento' }
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: { isNumeric: true }
    },
    estado: {
        type: DataTypes.ENUM('Reservado', 'Comprado', 'Cancelado'),
        allowNull: false
    },
    fecha_compra: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    metodo_pago: {
        type: DataTypes.ENUM('Efectivo', 'Tarjeta'),
        allowNull: false
    },
    codigo_ticket: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    tableName: 'transacciones',
    timestamps: false,
    hooks: {
        beforeCreate: (transaccion) => {
            transaccion.codigo_ticket = `TX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        }
    }
});

// 🔥 **Agregar las asociaciones correctas**
Transaccion.belongsTo(Horario, { foreignKey: 'id_horario', as: 'Horario' });
Transaccion.belongsTo(Cliente, { foreignKey: 'id_cliente', as: 'Cliente' });
Transaccion.belongsTo(Bus, { foreignKey: 'id_bus', as: 'Bus' });
Transaccion.belongsTo(Ruta, { foreignKey: 'id_ruta', as: 'Ruta' });
Transaccion.belongsTo(Asiento, { foreignKey: 'id_asiento', as: 'Asiento' });

module.exports = Transaccion;
