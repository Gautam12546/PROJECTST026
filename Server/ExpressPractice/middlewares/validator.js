const { check, validationResult } = require('express-validator');
exports.validateUser = [
    check("name")
        .trim()
        .not().
        isEmpty()
        .withMessage("name is missing")
        .isLength({ min: 6, max: 16 })
        .withMessage("invalid name, name must be 3 to 20 charectors long "),
    check('email')
        .normalizeEmail()
        .isEmail()
        .withMessage('email is invalid'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage("password is missing")
        .isLength({ min: 8, max: 12 })
        .withMessage(" password must be 8 to 12 charactors long!"),
];

exports.validate = (req, res, next) => {

    const error = validationResult(req).array()
    if (!error.length) return next()
    res.status(400).json({ success: false, error: error[0].msg })
}