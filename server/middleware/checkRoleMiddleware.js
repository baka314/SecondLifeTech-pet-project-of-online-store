const jwt = require('jsonwebtoken')

module.exports = function(roles) {
    return async function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
            if (!token) {
                return res.status(401).json({message: "Не авторизован"})
            }

            const decoded = await jwt.verify(token, process.env.SECRET_KEY)
            if (!roles.includes(decoded.role)) {
                return res.status(403).json({message: "Немає доступу"})
            }

            req.user = decoded;
            next()
        } catch (e) {
            res.status(401).json({message: "Не авторизован"})
        }
    };
}