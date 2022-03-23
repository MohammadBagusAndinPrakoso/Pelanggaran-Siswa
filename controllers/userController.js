const md5 = require("md5")
let jwt = require(`jsonwebtoken`)
// memanggil file model untuk user
let modelUser = require("../models/index").user
const { validationResult } = require(`express-validator`)

exports.getDataUser = (request, response) => {
    modelUser.findAll()
        .then(result => {
            return response.json(result)
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}

exports.findUser = async (request, response) => {
    let keyword = request.body.keyword

    // import sequelize operator
    let sequelize = require(`sequelize`)
    let Op = sequelize.Op
    /**
     * query = select * from user where username like "%keyword%" 
     * or nama_user like "%keyword%"
     */
    let dataUser = await modelUser.findAll({
        where: {
            [Op.or]: {
                username: { [Op.like]: `%${keyword}%` },
                nama_user: { [Op.like]: `%${keyword}%` }
            }
        }
    })
    return response.json(dataUser)
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
                message: error.message
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

    modelUser.update(dataUser, { where: { id_user: id } })
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

    modelUser.destroy({ where: { id_user: id } })
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

exports.authentication = async (request, response) => {

    let data = {
        username: request.body.username,
        password: md5(request.body.password)
    }

    // validasi (cek data di tabel user)
    let result = await modelUser.findOne({ where: data })

    if (result) {
        // data ditemukan

        // payload adalah data/informasi yg akan dienkripsi
        let payload = JSON.stringify(result) // konversi dari bentuk objek ke JSON

        let secretKey = `Sequelize itu sangat menyenangkan`

        let token = jwt.sign(payload, secretKey)
        return response.json({
            logged: true,
            token: token
        })
    } else {
        // data tidak ditemukan
        return response.json({
            logged: false,
            message: `Invalid Username or Password`
        })
    }
}

