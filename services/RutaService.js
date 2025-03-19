const Ruta = require("../models/Ruta");
const Empresa = require("../models/Empresa");

class RutaService {
  // Obtener todas las rutas con el nombre de la empresa
  static async obtenerRutas() {
    return await Ruta.findAll({
      include: { model: Empresa, attributes: ["nombre_empresa"] },
    });
  }

  // Obtener una ruta por ID con el nombre de la empresa
  static async obtenerRutaPorId(id) {
    const ruta = await Ruta.findByPk(id, {
      include: { model: Empresa, attributes: ["nombre_empresa"] },
    });
    if (!ruta) throw new Error("❌ Ruta no encontrada");
    return ruta;
  }

  // Validar que la empresa exista antes de crear o actualizar
  static async validarEmpresa(id_empresa) {
    if (!id_empresa) throw new Error("❌ El campo 'id_empresa' es obligatorio");
    const empresa = await Empresa.findByPk(id_empresa);
    if (!empresa) throw new Error("❌ La empresa especificada no existe");
  }

  // Validar todos los campos antes de crear o actualizar
  static validarCampos(datos) {
    const errores = [];

    if (!datos.id_empresa) errores.push("El campo 'id_empresa' es obligatorio");
    if (!datos.origen) errores.push("El campo 'origen' es obligatorio");
    if (!datos.destino) errores.push("El campo 'destino' es obligatorio");
    if (!datos.distancia) errores.push("El campo 'distancia' es obligatorio");
    if (!datos.duracion) errores.push("El campo 'duracion' es obligatorio");
    if (!datos.precio_base) errores.push("El campo 'precio_base' es obligatorio");

    if (errores.length > 0) throw new Error(errores.join(". "));

    // Validación de solo letras y espacios en "origen" y "destino"
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;

    if (!soloLetras.test(datos.origen)) {
      throw new Error(`❌ El campo 'origen' solo debe contener letras y espacios. Valor recibido: "${datos.origen}"`);
    }

    if (!soloLetras.test(datos.destino)) {
      throw new Error(`❌ El campo 'destino' solo debe contener letras y espacios. Valor recibido: "${datos.destino}"`);
    }

    if (isNaN(datos.distancia) || datos.distancia <= 0) {
      throw new Error("❌ El campo 'distancia' debe ser un número mayor a 0");
    }

    if (!datos.duracion.trim()) {
      throw new Error("❌ El campo 'duracion' es obligatorio");
    }

    if (isNaN(datos.precio_base) || datos.precio_base < 0) {
      throw new Error("❌ El campo 'precio_base' debe ser un número positivo");
    }
  }

  // Crear una nueva ruta con validaciones
  static async crearRuta(datos) {
    this.validarCampos(datos);
    await this.validarEmpresa(datos.id_empresa);
    return await Ruta.create(datos);
  }

  // Actualizar ruta con validaciones
  static async actualizarRuta(id, datos) {
    const ruta = await Ruta.findByPk(id);
    if (!ruta) throw new Error("❌ Ruta no encontrada");

    this.validarCampos(datos);
    if (datos.id_empresa) await this.validarEmpresa(datos.id_empresa);
    await ruta.update(datos);

    return { message: "✅ Ruta actualizada correctamente" };
  }

  // Eliminar ruta
  static async eliminarRuta(id) {
    const ruta = await Ruta.findByPk(id);
    if (!ruta) throw new Error("❌ Ruta no encontrada");

    await ruta.destroy();
    return { message: "✅ Ruta eliminada correctamente" };
  }
}

module.exports = RutaService;
