const Cliente = require('../models/Cliente');

class ClienteService {
    // Obtener todos los clientes
    static async obtenerClientes() {
        return await Cliente.findAll();
    }

    // Obtener un cliente por ID
    static async obtenerClientePorId(id) {
        return await Cliente.findByPk(id);
    }

    // Crear un nuevo cliente con validación
    static async crearCliente(nombre_completo) {
        console.log("📥 Nombre recibido:", nombre_completo);

        if (!nombre_completo) {
            throw new Error("El nombre es obligatorio");
        }

        // Aplicamos trim() para limpiar espacios en los extremos
        const nombreLimpio = nombre_completo.trim();
        console.log("✅ Nombre limpio después de trim():", nombreLimpio);

        // Nueva validación mejorada para aceptar solo letras, tildes y espacios
        if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(nombreLimpio)) {
            throw new Error("El nombre solo debe contener letras y espacios");
        }

        return await Cliente.create({ nombre_completo: nombreLimpio });
    }

    // Actualizar cliente con validación
    static async actualizarCliente(id, datosActualizados) {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            throw new Error("Cliente no encontrado");
        }

        // Si se envía un nuevo nombre, validarlo
        if (datosActualizados.nombre_completo) {
            const nombreLimpio = datosActualizados.nombre_completo.trim();
            console.log("📥 Nombre a actualizar:", nombreLimpio);

            if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(nombreLimpio)) {
                throw new Error("El nombre solo debe contener letras y espacios");
            }

            datosActualizados.nombre_completo = nombreLimpio;
        }

        await cliente.update(datosActualizados);
        return { message: "Cliente actualizado correctamente" };
    }

    // Eliminar cliente por ID
    static async eliminarCliente(id) {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            throw new Error("Cliente no encontrado");
        }

        await cliente.destroy();
        return { message: "Cliente eliminado correctamente" };
    }
}

module.exports = ClienteService;
