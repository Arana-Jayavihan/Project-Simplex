import { check, validationResult } from 'express-validator'
const validateReq = [
    check('firstName').notEmpty().withMessage('First name is required!'),
    check('lastName').notEmpty().withMessage('Last name is required!'),
    check('email').isEmail().withMessage('A valid email is required!'),
    check('password').isLength({min: 8}).withMessage('Minimum password length is 8 characters')
]

const isReqValidated = (req, res, next) => {
    const errors = validationResult(req)
    if(errors.array().length > 0){
        res.status(400).json({error: errors.array()[0].msg})
        return
    }
    next()
}

const valSignReq = [
    check('email').isEmail().withMessage('A valid email is required!'),
    check('password').isLength({min: 8}).withMessage('Minimum password length is 8 characters')
]


export { valSignReq, validateReq, isReqValidated }