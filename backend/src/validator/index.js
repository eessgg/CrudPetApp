import { check, validationResult } from 'express-validator'

const userRegisterValidator = [
  check('name')
    .isLength({min: 2})
    .withMessage('Nome com mais de 3 caracteres.'),
  check('email').isEmail().withMessage('Digite um email válido.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
]

export {
  userRegisterValidator
}