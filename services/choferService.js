const Chofer = require('../models/Chofer');
const Empresa = require('../models/Empresa'); // Importamos Empresa para validar id_empresa

class ChoferService {
    static async obtenerChoferes() {
        return await Chofer.findAll();
    }

    static async obtenerChoferPorId(id) {
        return await Chofer.findByPk(id);
    }

    static async crearChofer(datos) {
        if (!datos.nombre || !datos.dni || !datos.telefono || !datos.licencia_conducir || !datos.fecha_contratacion || !datos.id_empresa) {
            throw new Error("Todos los campos son obligatorios");
        }

        if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(datos.nombre.trim())) {
            throw new Error("El nombre solo debe contener letras y espacios");
        }

        if (!/^\d{8,12}$/.test(datos.dni)) {
            throw new Error("El DNI debe tener entre 8 y 12 dígitos numéricos");
        }

        if (!/^\d{8}$/.test(datos.telefono)) {
            throw new Error("El teléfono debe tener exactamente 8 dígitos numéricos");
        }

        // Verificamos que la empresa exista antes de asignarla
        const empresa = await Empresa.findByPk(datos.id_empresa);
        if (!empresa) {
            throw new Error("La empresa seleccionada no existe");
        }

        try {
            return await Chofer.create(datos);
        } catch (error) {
            if (error.name === "SequelizeUniqueConstraintError") {
                if (error.errors[0].path === "dni") {
                    throw new Error("El DNI ya está registrado, usa uno diferente");
                }
                if (error.errors[0].path === "licencia_conducir") {
                    throw new Error("La licencia de conducir ya está registrada, usa una diferente");
                }
            }
            throw error;
        }
    }

    static async actualizarChofer(id, datos) {
        const chofer = await Chofer.findByPk(id);
        if (!chofer) throw new Error("Chofer no encontrado");

        let camposActualizados = {};

        if (datos.id_empresa && datos.id_empresa !== chofer.id_empresa) {
            // Verificar que la empresa existe antes de actualizar
            const empresa = await Empresa.findByPk(datos.id_empresa);
            if (!empresa) {
                throw new Error("La empresa seleccionada no existe");
            }
            camposActualizados.id_empresa = datos.id_empresa;
        }

        if (datos.nombre && datos.nombre !== chofer.nombre) {
            if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(datos.nombre.trim())) {
                throw new Error("El nombre solo debe contener letras y espacios");
            }
            camposActualizados.nombre = datos.nombre;
        }

        if (datos.telefono && datos.telefono !== chofer.telefono) {
            if (!/^\d{8}$/.test(datos.telefono)) {
                throw new Error("El teléfono debe tener exactamente 8 dígitos numéricos");
            }
            camposActualizados.telefono = datos.telefono;
        }

        if (datos.dni && datos.dni !== chofer.dni) {
            const existeDni = await Chofer.findOne({ where: { dni: datos.dni } });
            if (existeDni) throw new Error("El DNI ya está registrado, usa uno diferente");
            camposActualizados.dni = datos.dni;
        }

        if (datos.licencia_conducir && datos.licencia_conducir !== chofer.licencia_conducir) {
            const existeLicencia = await Chofer.findOne({ where: { licencia_conducir: datos.licencia_conducir } });
            if (existeLicencia) throw new Error("La licencia de conducir ya está registrada, usa una diferente");
            camposActualizados.licencia_conducir = datos.licencia_conducir;
        }

        try {
            await chofer.update(camposActualizados);
            return { message: "Chofer actualizado correctamente", chofer };
        } catch (error) {
            throw new Error("Error al actualizar el chofer: " + error.message);
        }
    }

    static async eliminarChofer(id) {
        const chofer = await Chofer.findByPk(id);
        if (!chofer) throw new Error("Chofer no encontrado");

        await chofer.destroy();
        return { message: "Chofer eliminado correctamente" };
    }
}

module.exports = ChoferService;