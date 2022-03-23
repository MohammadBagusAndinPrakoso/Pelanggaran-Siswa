exports.authorization = (request, response, next) => {
    // token dikirimkan melalui header
    let header = request.header.authorization

    if (header === null) {
        return response.json({
            message: `Unauthorize Person`
        })
    }

    let token = header && header.split(" ")[1]

    if (token === null) {
        return request.json({
            message: `Invalid Token`
        })
    } else {
        next()
    }
}