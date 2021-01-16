import express from 'express';
const router = express.Router();

import { register, login, logout } from '../controllers/auth_controller.js';
import { userRegisterValidator } from '../validator/index.js';

router.post('/users/login', login);
router.post('/users/register', userRegisterValidator, register);
router.post('/users/logout', logout);


export default router;