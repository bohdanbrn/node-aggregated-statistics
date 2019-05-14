
const auth = async (req, res, next) => {
    try {
        const contentType = req.header('content-type');

        if (contentType != 'application/octet-stream') {
            throw new Error();
        }

        next();
    } catch (e) {
        res.status(406).send({ error: 'Invalid Content-Type.' })
    }
}

module.exports = auth;