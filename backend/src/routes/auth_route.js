import express from 'express';
const router = express.Router();

import {register} from '../controllers/auth_controller.js'


router.post('/users/register', register)


export default router;