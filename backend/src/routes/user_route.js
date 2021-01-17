import express from 'express';
const router = express.Router();

import { requireSignin, isAdmin, isAuth } from '../controllers/auth_controller.js';
import { getAll, userById } from '../controllers/user_controller.js';


router.get('/users', getAll);
router.get('/users/:userId', userById);

router.get('/secret', requireSignin(), isAdmin,  isAuth, (req, res) => {
  res.json({user: 'yay'});
});

router.param('userId', userById);

export default router;