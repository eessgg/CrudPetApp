import express from 'express';
const router = express.Router();


import { register, login, logout } from '../controllers/auth_controller.js';
import { userRegisterValidator } from '../validator/index.js';


router.post('/users/login', login);
router.get('/users/logout', logout);
router.post('/users/register', userRegisterValidator, register);


export default router;