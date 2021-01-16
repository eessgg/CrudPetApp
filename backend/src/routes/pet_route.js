import express from 'express';
const router = express.Router();

import { create, list } from '../controllers/pet_controller.js';

router.get('/pets', list);
router.post('/pets/create', create);

export default router;