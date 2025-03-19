const Autobus = require("../models/Autobus");
const Empresa = require("../models/Empresa");
const Chofer = require("../models/Chofer");

class AutobusService {
  // Obtener todos los autobuses con información de empresa y chofer
  static async obtenerAutobuses() {
    return await Autobus.findAll({
      include: [
        { model: Empresa, attributes: ["id_empresa", "nombre_empresa"] },
        { model: Chofer, attributes: ["id_chofer", "nombre"], required: false },
      ],
    });
  }

  // Obtener un autobús por ID
  static async obtenerAutobusPorId(id) {
    const autobus = await Autobus.findByPk(id, {
      include: [
        { model: Empresa, attributes: ["id_empresa", "nombre_empresa"] },
        { model: Chofer, attributes: ["id_chofer", "nombre"], required: false },
      ],
    });
    if (!autobus) {
      throw new Error("🚨 Autobús no encontrado");
    }
    return autobus;
  }

  // Crear un nuevo autobús con validaciones detalladas
  static async crearAutobus(datos) {
    const { id_empresa, id_chofer, placa, capacidad } = datos;

    if (!id_empresa) {
      throw new Error("⚠️ El campo 'id_empresa' es obligatorio");
    }

    if (!placa) {
      throw new Error("⚠️ El campo 'placa' es obligatorio");
    }

    if (!capacidad) {
      throw new Error("⚠️ El campo 'capacidad' es obligatorio");
    }

    // Verificar que la empresa exista
    const empresa = await Empresa.findByPk(id_empresa);
    if (!empresa) {
      throw new Error("🚨 La empresa seleccionada no existe");
    }

    // Verificar que el chofer exista (si se envía)
    if (id_chofer) {
      const chofer = await Chofer.findByPk(id_chofer);
      if (!chofer) {
        throw new Error("🚨 El chofer seleccionado no existe");
      }
    }

    // Verificar que la placa sea única
    const existePlaca = await Autobus.findOne({ where: { placa } });
    if (existePlaca) {
      throw new Error("⚠️ La placa ya está registrada en otro autobús");
    }

    // Validar la capacidad
    if (isNaN(capacidad) || capacidad < 10 || capacidad > 100) {
      throw new Error("⚠️ La capacidad debe estar entre 10 y 100 asientos");
    }

    return await Autobus.create(datos);
  }

  // Actualizar un autobús con validaciones detalladas
  static async actualizarAutobus(id, datos) {
    const autobus = await Autobus.findByPk(id);
    if (!autobus) {
      throw new Error("🚨 Autobús no encontrado");
    }

    let camposActualizados = {};

    if (datos.id_empresa !== undefined && datos.id_empresa !== autobus.id_empresa) {
      const empresa = await Empresa.findByPk(datos.id_empresa);
      if (!empresa) {
        throw new Error("🚨 La empresa seleccionada no existe");
      }
      camposActualizados.id_empresa = datos.id_empresa;
    }

    if (datos.id_chofer !== undefined && datos.id_chofer !== autobus.id_chofer) {
      if (datos.id_chofer) {
        const chofer = await Chofer.findByPk(datos.id_chofer);
        if (!chofer) {
          throw new Error("🚨 El chofer seleccionado no existe");
        }
      }
      camposActualizados.id_chofer = datos.id_chofer;
    }

    if (datos.placa && datos.placa !== autobus.placa) {
      const existePlaca = await Autobus.findOne({ where: { placa: datos.placa } });
      if (existePlaca) {
        throw new Error("⚠️ La nueva placa ya está registrada en otro autobús");
      }
      camposActualizados.placa = datos.placa;
    }

    if (datos.capacidad) {
      if (isNaN(datos.capacidad) || datos.capacidad < 10 || datos.capacidad > 100) {
        throw new Error("⚠️ La capacidad debe estar entre 10 y 100 asientos");
      }
      camposActualizados.capacidad = datos.capacidad;
    }

    await autobus.update(camposActualizados);
    return { message: "✅ Autobús actualizado correctamente", autobus };
  }

  // Eliminar un autobús
  static async eliminarAutobus(id) {
    const autobus = await Autobus.findByPk(id);
    if (!autobus) {
      throw new Error("🚨 Autobús no encontrado");
    }

    await autobus.destroy();
    return { message: "🗑️ Autobús eliminado correctamente" };
  }
}

module.exports = AutobusService;
