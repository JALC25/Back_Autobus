const Empresa = require('../models/Empresa');

class EmpresaService {
    static async obtenerEmpresas() {
        return await Empresa.findAll();
    }

    static async obtenerEmpresaPorId(id) {
        return await Empresa.findByPk(id);
    }

    static async crearEmpresa(datos) {
        // Validar que todos los campos estén presentes
        if (!datos.nombre_empresa || !datos.direccion || !datos.telefono_contacto || !datos.email_contacto) {
            throw new Error("Todos los campos son obligatorios");
        }

        // Validar nombre (solo letras y espacios)
        if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(datos.nombre_empresa.trim())) {
            throw new Error("El nombre de la empresa solo debe contener letras y espacios");
        }

        // Validar teléfono (exactamente 8 dígitos numéricos)
        if (!/^\d{8}$/.test(datos.telefono_contacto)) {
            throw new Error("El teléfono debe tener exactamente 8 dígitos numéricos");
        }

        try {
            return await Empresa.create(datos);
        } catch (error) {
            // Capturar error de correo duplicado
            if (error.name === "SequelizeUniqueConstraintError") {
                throw new Error("El correo electrónico ya está registrado, usa uno diferente");
            }
            throw error;
        }
    }

    static async actualizarEmpresa(id, datos) {
        const empresa = await Empresa.findByPk(id);
        if (!empresa) throw new Error("Empresa no encontrada");

        if (datos.nombre_empresa && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(datos.nombre_empresa.trim())) {
            throw new Error("El nombre de la empresa solo debe contener letras y espacios");
        }
        if (datos.telefono_contacto && !/^\d{8}$/.test(datos.telefono_contacto)) {
            throw new Error("El teléfono debe tener exactamente 8 dígitos numéricos");
        }

        try {
            await empresa.update(datos);
            return { message: "Empresa actualizada correctamente" };
        } catch (error) {
            if (error.name === "SequelizeUniqueConstraintError") {
                throw new Error("El correo electrónico ya está registrado, usa uno diferente");
            }
            throw error;
        }
    }

    static async eliminarEmpresa(id) {
        const empresa = await Empresa.findByPk(id);
        if (!empresa) throw new Error("Empresa no encontrada");

        await empresa.destroy();
        return { message: "Empresa eliminada correctamente" };
    }
}

module.exports = EmpresaService;
