// memanggil file model untuk siswa
let modelSiswa = require("../models/index").siswa

let path = require("path")
let fs = require("fs")

exports.getDataSiswa = (request, response) => {
    modelSiswa.findAll()
        .then(result => {
            return response.json(result)
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}

exports.findSiswa = async (request, response) => {
    let keyword = request.body.keyword

    let sequelize = require(`sequelize`)
    let Op = sequelize.Op

    /**
     * query = select * from siswa where nama like "%keyword%"
     * or kelas like "%keyword%" or nis like "%keyword%"
     */
    let dataSiswa = modelSiswa.findAll({
        where: {
            [Op.or]: {
                nama: { [Op.like] : `%${keyword}%` },
                kelas: { [Op.like] : `%${keyword}%` },
                nis: { [Op.like] : `%${keyword}%` }
            }
        }
    })

    return response.json(dataSiswa)
}

exports.addDataSiswa = (request, response) => {
    if (!request.file) {
        return response.json({
            message: `Nothing to upload`
        })
    }

    // tampung data request
    let newSiswa = {
        nama: request.body.nama,
        kelas: request.body.kelas,
        poin: request.body.poin,
        nis: request.body.nis,
    }

    modelSiswa.create(newSiswa)
        .then(result => {
            return response.json({
                message: `Data siswa berhasil ditambahkan`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}

exports.editDataSiswa = async (request, response) => {
    let id = request.params.id_siswa
    let dataSiswa = {
        nama: request.body.nama,
        nis: request.body.nis,
        poin: request.body.poin,
        kelas: request.body.kelas
    }

    if(request.file){
        // jika edit menyertakan file gambar
        let siswa = await modelSiswa.findOne({where: {id_siswa: id}})
        let oldFileName = siswa.image

        // delete file
        let location = path.join(__dirname, "../image", oldFileName)
        fs.unlink(location, error => console.log(error))

        dataSiswa.image = request.file.filename
    }

    modelSiswa.update(dataSiswa, { where: { id_siswa: id } })
        .then(result => {
            return response.json({
                message: `Data siswa berhasil diubah`
            })
        })
        .catch(errot => {
            return response.json({
                message: error.message
            })
        })
}

exports.deleteDataSiswa = async (request, response) => {
    let id = request.params.id_siswa

    // ambil dulu data filename yang akkan dihapus
    let siswa = await modelSiswa.findOne({ where: { id_siswa: id } })
    if (siswa) {
        let oldFileName = siswa.image

        // delete file
        let location = path.join(__dirname, "../image", oldFileName)
        fs.unlink(location)
    }

    modelSiswa.destroy({ where: { id_siswa: id } })
        .then(result => {
            return response.json({
                message: `Data siswa berhasil dihapus`
            })
        })
        .catch(errot => {
            return response.json({
                message: error.message
            })
        })
}
