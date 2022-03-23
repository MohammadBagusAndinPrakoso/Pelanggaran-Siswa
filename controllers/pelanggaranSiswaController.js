let pelanggaranSiswaModel = require("../models/index").pelanggaran_siswa
let detailPelanggaranSiswaModel = require("../models/index").detail_pelanggaran
let siswaModel = require("../models/index").siswa
let pelanggaranModel = require("../models/index")

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

exports.filterPelanggaran = async (request, response) => {
    // filter tanggal awal sama tanggal akhir
    let start = request.body.start // tgl awal
    let end = request.body.end // tgl akhir

    /**
     * query = select * from pelanggrana_siswa
     */
    let sequelize = require(`sequelize`)
    let Op = sequelize.Op

    let data = await pelanggaranSiswaModel.findAll({
        include: ["siswa", "user", {
            model: detailPelanggaranSiswaModel,
            as: "detail_pelanggaran_siswa",
            include: ["pelanggaran"]
        }],
        where: {
            waktu: {[Op.between]: [start, end] }
        }
    })
    return response.json(data)
}

exports.eachSiswa = async(request, response) => {
    let id = request.params.id_siswa
    let data = await pelanggaranSiswaModel.findAll({
        include: ["siswa", "user", {
            model: detailPelanggaranSiswaModel,
            as: "detail_pelanggaran_siswa",
            include: ["pelanggaran"]
        }],
        where: {
            id_siswa: id
        }
    })
    return response.json(data)
}

exports.addData = (request, response) => {
    // proses pengurangan poin dari siswa yang melanggar
    // 1. Mengambil poin dari siswa yang bersangkutan
    let siswa = await siswaModel.findOne({
        where: { id_siswa: request.body.id_siswa }
    })

    let poinSiswa = siswa.poin

    // 2. Mengambil nilai poin dari tiap pelanggarannya
    let detail = request.body.detail_pelanggaraan_siswa
    let jumlahPoinPelanggaran = 0
    for (let i = 0; i < detail.length; i++) {
        // ambil poin dari tiap pelanggaran
        let pelanggaran = await pelanggaranModel.findOne({
            where: { id_pelanggaran: detail[i].id_pelanggaran }
        })
        jumlahPoinPelanggaran += poinPelanggaran

    }

    let poinPelanggaran = pelanggaran.poin

    // 3. Poin siswa dikurangi jumlah pelanggarannya
    let newPoin = poinSiswa - jumlahPoinPelanggaran

    // 4. Meng-update poin siswanya
    await siswaModel.update({
        poin: newPoin
    },
        {
            where: { id_siswa: request.body.id_siswa }
        })

    // proses untuk insert ke tabel pelanggaran_siswa
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
                detail_pelanggaran_siswa[i].id_pelanggaran_siswa = id

            }

            // insert ke tabel detail_pelanggaran_siswa
            detailPelanggaranSiswaModel1.bulkCreate(detail_pelanggaran_siswa)
                .then(result => {
                    return response.json({
                        message: `Data pelanggaran siswa berhasil ditambahkan`
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

exports.updateData = async (request, response) => {
    let id = request.params.id

    // define data yang diubah di tabel pelanggaran
    let newData = {
        waktu: request.body.waktu,
        id_siswa: request.body.id_siswa,
        id_user: request.body.id_user
    }

    // eksekusi update tabel pelanggrana_siswa
    pelanggaranSiswaModel.update(
        newData, { where: { id_pelanggaran_siswa: id } }
    )

        .then(async result => {
            // ada 2 detail -> 1 detail
            // kita hapus data detail yang lama
            // lalu insert data detail terbaru

            // 1. hapus semua detail berdasarkan id_pelanggaran_siswa
            await detailPelanggaranSiswaModel.destroy(
                {
                    where: {
                        id_pelanggaran_siswa: request.params.id_pelanggaran_siswa
                    }
                }
            )

            // 2. insert kembali data detail terbaru
            let detail_pelanggaraan_siswa = request.body.detail_pelanggaraan_siswa
            let id = request.params.id.pelanggaran_siswwa
            for (let i = 0; i < detail_pelanggaran_siswa.length; i++) {
                detail_pelanggaran_siswa[i].id_pelanggaran_siswa = id

            }

            // insert ke tabel detail_pelanggaran_siswa
            detailPelanggaranSiswaModel1.bulkCreate(detail_pelanggaran_siswa)
                .then(result => {
                    return response.json({
                        message: `Data pelanggaran siswa berhasil diubah`
                    })
                })
                .catch(error => {
                    return response.json({
                        message: error.message
                    })
                })
        })
        .catch(error => console.log(error))

}

exports.deleteData = (request, response) => {
    let id = request.params.id_pelanggaran_siswa

    // hapus detail pelanggaran siswa
    detailPelanggaranSiswaModel.destroy({
        where: {
            id_pelanggaran_siswa: id
        }
    })
        .then(result => {
            let id = request.params.id_pelanggaran_siswa

            // hapus data pelanggaran siswa
            pelanggaranSiswaModel.destroy({
                where: {
                    id_pelanggaran_siswa: id
                }
            })
                .then(result => {
                    return response.json({
                        message: `Data pelanggaran siswa berhasil dihapus`
                    })
                })
                .catch(error => {
                    return response.json({
                        message: error.message
                    })
                })
        })
        .catch(error => console.log(error))
}