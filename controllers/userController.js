// memanggil file model untuk user
let modelUser = require("../models/index").user

exports.getDataUser = (request, response) => {
    modelUser.findAll()
    .then(result => {
        return response.json(result)
    })
    .catch(error => {
        return response.json({
            message : error.message
        })
    })
}

exports.addDataUser = (request, response) => {
    // untuk enkripsi password menggunakan md5
    const md5 = require("md5")
    let password = md5(request.body.password)
    
    // tampung data request
    let newUser = {
        nama_user: request.body.nama,
        username: request.body.username,
        password: password
    }

    modelUser.create(newUser)
    .then(result => {
        return response.json({
            message: `Data siswa berhasil ditambahkan`
        })
    })
    .catch(error => {
        return response.json({
            message : error.message
        })
    })
}

exports.editDataUser = (request, response) => {
    let id = request.params.id_user
    const md5 = require("md5")
    let password = md5(request.body.password)
    
    let dataUser = {
        nama_user: request.body.nama,
        username: request.body.username,
        password: password
    }

    modelUser.update(dataUser, {where: {id_user: id}})
    .then(result => {
        return response.json({
            message: `Data user berhasil diubah`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.deleteDataUser = (request, response) => {
    let id = request.params.id_user

    modelUser.destroy({where: {id_user: id}})
    .then(result => {
        return response.json({
            message: `Data user berhasil dihapus`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}