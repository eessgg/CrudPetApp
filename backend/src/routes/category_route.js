import express from 'express';
const router = express.Router();

import { userById } from '../controllers/user_controller.js'
import { categoryById , create, allCategories } from '../controllers/category_controller.js';
import { isAdmin, isAuth, requireSignin } from '../controllers/auth_controller.js';

// POST /api/category/create/:id
// /api/category/create
// router.post('/category/:categoryId', read);
router.post("/category/create/:userId", requireSignin(), isAuth, isAdmin ,create);
router.get("/categories", allCategories);


router.param('categoryId', categoryById)
router.param("userId", userById);

export default router;