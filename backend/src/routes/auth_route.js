import express from 'express';
const router = express.Router();

import { getAll ,register, login } from '../controllers/auth_controller.js';
import { userRegisterValidator } from '../validator/index.js';

router.get('/users', getAll);
router.post('/users/login', login);
router.post('/users/register', userRegisterValidator, register);


export default router;