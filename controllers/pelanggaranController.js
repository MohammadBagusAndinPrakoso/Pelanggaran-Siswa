const { ValidationErrorItemType } = require("sequelize/types")

// memanggil file model untuk siswa
let modelPelanggaran = require("../models/index").pelanggaran

exports.getDataPelanggaran = (request, response) => {
    modelPelanggaran.findAll()
    .then(result => {
        return response.json(result)
    })
    .catch(error => {
        return response.json({
            message: ValidationErrorItemType.message
        })
    })
}

exports.addDataPelanggaran = (request, response) => {
    // tampung data request
    let newPelanggaran = {
        nama: request.body.nama,
        poin: request.body.poin
    }
    
    modelPelanggaran.create(newPelanggaran)
    .then(result => {
        return response.json({
            message: `Data pelanggaran berhasil ditambahkan`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.editDataPelanggaran = (request, response) => {
    let id = request.params.id_pelanggaran
    let dataPelanggaran = {
        nama: request.body.nama,
        poin: request.body.poin
    }

    modelPelanggaran.update(dataPelanggaran, {where: {id_pelanggaran: id}})
    .then(result => {
        return response.json({
            message: `Data pelanggaran berhasil diubah`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.deleteDataSiswa = (request, response) => {
    let id = request.params.id_pelanggaran

    modelPelanggaran.destroy({where: {id_pelanggaran: id}})
    .then(result => {
        return response.json({
            message: `Data pelanggaran berhasil dihapus`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}
