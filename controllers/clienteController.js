const ClienteService = require('../services/clienteService');

class ClienteController {
    // Obtener todos los clientes
    static async getClientes(req, res) {
        try {
            const clientes = await ClienteService.obtenerClientes();
            res.json(clientes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener un cliente por ID
    static async getClienteById(req, res) {
        try {
            const cliente = await ClienteService.obtenerClientePorId(req.params.id);
            if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" });
            res.json(cliente);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Crear cliente con validación
    static async createCliente(req, res) {
        try {
            const nombre_completo = req.body.nombre_completo?.trim(); // Limpiar espacios antes de enviar
            const cliente = await ClienteService.crearCliente(nombre_completo);
            res.status(201).json(cliente);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Actualizar cliente con validación
    static async updateCliente(req, res) {
        try {
            const respuesta = await ClienteService.actualizarCliente(req.params.id, req.body);
            res.json(respuesta);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Eliminar cliente
    static async deleteCliente(req, res) {
        try {
            const respuesta = await ClienteService.eliminarCliente(req.params.id);
            res.json(respuesta);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = ClienteController;
