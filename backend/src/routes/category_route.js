import express from 'express';
const router = express.Router();

import { userById } from '../controllers/user_controller.js'
import { categoryById , create, list } from '../controllers/category_controller.js';

// POST /api/category/create/:id
// /api/category/create
// router.post('/category/:categoryId', read);
router.get("/categories", list);
router.post("/category/create/:userId", create);


router.param('categoryId', categoryById)
router.param("userId", userById);

export default router;