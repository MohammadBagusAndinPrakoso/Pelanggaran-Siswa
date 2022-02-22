const express = require(`express`)
const app = express()

app.use(express.json())

// call pelanggaran controller
let pelanggaranController = require("../controllers/pelanggaranController")

// endpoint untuk get data pelanggaran
app.get("/", pelanggaranController.getDataPelanggaran)

// endpoint untuk menambahkan data pelanggaran
app.post("/", pelanggaranController.addDataPelanggaran)

// endpoint untuk update/edit data pelanggaran
app.put("/:id_pelanggaran", pelanggaranController.editDataPelanggaran)

// endpoint untuk delete data pelanggaran
app.delete("/:id_pelanggaran", pelanggaranController.deleteDataPelanggaran)

module.exports = app