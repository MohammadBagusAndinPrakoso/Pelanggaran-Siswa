const multer = require("multer")
const path = require("path")
const fs = require("fs")

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "./image")
        // ini config untuk menentukan folder pentimpanan file yang di upload
    },
    filename: (request, file, callback) => {
        callback(null, `image-${Date.now()}${path.extname(file.originalname)}`)
        // ini config untuk menentukan nama fule yang diipload
    }
})

exports.upload = multer({storage: storage})