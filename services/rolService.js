const Rol = require('../models/Rol');

class RolService {
    // Obtener todos los roles
    static async getAllRoles() {
        return await Rol.findAll();
    }

    // Obtener un rol por ID
    static async getRolById(id) {
        return await Rol.findByPk(id);
    }

    // Crear un nuevo rol
    static async createRol(data) {
        return await Rol.create(data);
    }

    // Actualizar un rol
    static async updateRol(id, data) {
        const rol = await Rol.findByPk(id);
        if (!rol) throw new Error('Rol no encontrado');
        return await rol.update(data);
    }

    // Eliminar un rol
    static async deleteRol(id) {
        const rol = await Rol.findByPk(id);
        if (!rol) throw new Error('Rol no encontrado');
        return await rol.destroy();
    }
}

module.exports = RolService;
