let pelanggaranSiswaModel = require("../models/index").pelanggaran_siswa
let detailPelanggaranSiswaModel = require("../modells/index").detail_pelanggaran

exports.getData = (request, response) => {
    let data = await pelanggaranSiswaModel.findAll({
        include: ["siswa", "user", {
            model: detailPelanggaranSiswaModel,
            as: "detail_pelanggaran_siswa",
            include: ["pelanggaran"]
        }]
    })
    return response.json(data)
}

exports.addData = (request, response) => {
    let newData = {
        waktu: request.data.waktu,
        id_siswa: request.data.id_siswa,
        id_user: request.data.id_user
    }

    // insert ke tabel pelanggaran_siswa
    pelanggaranSiswaModel.create(newData)
    .then(result => {
        let detail_pelanggaran_siswa = request.body.detail_pelanggaran_siswa
        // asumsinya detail_pelanggaraan_siswa itu bertipe array, karena bisa saja nanti datanya lebih dari satu pelanggaran
        let id = result.id.pelanggaran_siswwa
        for (let i = 0; i < detail_pelanggaran_siswa.length; i++) {
            detail_pelanggaran_siswa[i].id_pelanggaran_siwa = id
            
        }

        // insert ke tabel detail_pelanggaran_siswa
        detailPelanggaranSiswaModel1.bulkCreate(detail_pelanggaran_siswa)
        .then(result => {
            return response.json({
                message: `Data pelaggaran siswa berhasil ditambahkan`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.updateData = (request, response) => {
    
}

exports.deleteData = (request, response) => {
    
}