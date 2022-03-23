const express = require(`express`)
const app = express()
const authorization = require("../middlewares/authorization")

app.use(express.json())

// call pelanggaran controller
let pelanggaranController = require("../controllers/pelanggaranController")

// endpoint untuk get data pelanggaran
app.get("/", [authorization.authorization], pelanggaranController.getDataPelanggaran)

// endpoint untuk menambahkan data pelanggaran
app.post("/", [authorization.authorization], pelanggaranController.addDataPelanggaran)

// endpoint untuk update/edit data pelanggaran
app.put("/:id_pelanggaran", [authorization.authorization], pelanggaranController.editDataPelanggaran)

// endpoint untuk delete data pelanggaran
app.delete("/:id_pelanggaran", [authorization.authorization], pelanggaranController.deleteDataPelanggaran)

module.exports = app