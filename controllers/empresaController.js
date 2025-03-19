const EmpresaService = require('../services/empresaService');

class EmpresaController {
    static async getEmpresas(req, res) {
        try {
            const empresas = await EmpresaService.obtenerEmpresas();
            res.json(empresas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getEmpresaById(req, res) {
        try {
            const empresa = await EmpresaService.obtenerEmpresaPorId(req.params.id);
            if (!empresa) return res.status(404).json({ error: "Empresa no encontrada" });
            res.json(empresa);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createEmpresa(req, res) {
        try {
            const empresa = await EmpresaService.crearEmpresa(req.body);
            res.status(201).json(empresa);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateEmpresa(req, res) {
        try {
            const respuesta = await EmpresaService.actualizarEmpresa(req.params.id, req.body);
            res.json(respuesta);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteEmpresa(req, res) {
        try {
            const respuesta = await EmpresaService.eliminarEmpresa(req.params.id);
            res.json(respuesta);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = EmpresaController;
