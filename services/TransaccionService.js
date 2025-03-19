const Transaccion = require('../models/Transaccion');
const Horario = require('../models/Horario');
const Cliente = require('../models/Cliente');
const Bus = require('../models/Autobus');
const Ruta = require('../models/Ruta');
const Asiento = require('../models/Asiento');

class TransaccionService {
    // Obtener todas las transacciones con sus asociaciones
    static async obtenerTransacciones() {
        return await Transaccion.findAll({
            include: [
                { model: Horario, as: 'Horario' },
                { model: Cliente, as: 'Cliente' },
                { model: Bus, as: 'Bus' },
                { model: Ruta, as: 'Ruta' },
                { model: Asiento, as: 'Asiento' }
            ]
        });
    }

    // Obtener una transacción por ID con asociaciones
    static async obtenerTransaccionPorId(id) {
        return await Transaccion.findByPk(id, {
            include: [
                { model: Horario, as: 'Horario' },
                { model: Cliente, as: 'Cliente' },
                { model: Bus, as: 'Bus' },
                { model: Ruta, as: 'Ruta' },
                { model: Asiento, as: 'Asiento' }
            ]
        });
    }

    // Crear una nueva transacción con validaciones
    static async crearTransaccion(datos) {
        if (!datos.id_horario || !datos.id_bus || !datos.id_ruta || !datos.id_asiento || !datos.precio || !datos.estado || !datos.metodo_pago) {
            throw new Error("Todos los campos son obligatorios excepto el id_cliente.");
        }

        // Validar método de pago
        if (!['Efectivo', 'Tarjeta'].includes(datos.metodo_pago)) {
            throw new Error("El método de pago debe ser 'Efectivo' o 'Tarjeta'.");
        }

        // Validar existencia de las llaves foráneas
        const horario = await Horario.findByPk(datos.id_horario);
        if (!horario) throw new Error("El ID de horario no existe.");

        if (datos.id_cliente) {
            const cliente = await Cliente.findByPk(datos.id_cliente);
            if (!cliente) throw new Error("El ID de cliente no existe.");
        }

        const bus = await Bus.findByPk(datos.id_bus);
        if (!bus) throw new Error("El ID de bus no existe.");

        const ruta = await Ruta.findByPk(datos.id_ruta);
        if (!ruta) throw new Error("El ID de ruta no existe.");

        const asiento = await Asiento.findByPk(datos.id_asiento);
        if (!asiento) throw new Error("El ID de asiento no existe.");

        // Crear la transacción con código de ticket autogenerado
        return await Transaccion.create({
            ...datos,
            codigo_ticket: `TX-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            fecha_compra: new Date()
        });
    }

    // Actualizar una transacción
    static async actualizarTransaccion(id, datosActualizados) {
        const transaccion = await Transaccion.findByPk(id);
        if (!transaccion) {
            throw new Error("Transacción no encontrada.");
        }

        await transaccion.update(datosActualizados);
        return { message: "Transacción actualizada correctamente" };
    }

    // Eliminar una transacción por ID
    static async eliminarTransaccion(id) {
        const transaccion = await Transaccion.findByPk(id);
        if (!transaccion) {
            throw new Error("Transacción no encontrada.");
        }

        await transaccion.destroy();
        return { message: "Transacción eliminada correctamente" };
    }
}

module.exports = TransaccionService;
