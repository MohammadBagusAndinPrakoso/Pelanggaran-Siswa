const {body} = require(`express-validator`)

exports.validate = [
    body(`password`).isLength({ min: 8})
    .withMessage(`Password at least 8 characters`),


    body(`username`).notEmpty()
    .withMessage(`Username must be filled`),

    body(`nama_user`).notEmpty()
    .withMessage(`Name of user must be filled`)
]