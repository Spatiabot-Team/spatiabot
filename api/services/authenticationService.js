

exports.init = function (app) {
    jwt = app.get('jwt');
};

/**
 * Verify if there is a token in the header of the request
 * @param {type} req
 * @param {type} res
 * @param {type} next
 * @returns {undefined}
 */
exports.ensureAuthorized = function (req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        req.userConected = jwt.verify(req.token, "secret", function (err, decoded) {
            if (err) {
                res.status(403);
                return res.json({ success: false, message: 'Le token n\'est pas valide' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send(403);
    }
};