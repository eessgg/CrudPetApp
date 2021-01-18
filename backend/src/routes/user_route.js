import express from 'express';
const router = express.Router();

import { requireSignin, isAdmin, isAuth } from '../controllers/auth_controller.js';
import { allUsers, userById, singleUser } from '../controllers/user_controller.js';

//
router.get('/secret', requireSignin(), (req, res) => {
  res.json({user: 'yay'});
});
router.get('/users/:userId', requireSignin(), isAuth,  singleUser);
router.get('/users', allUsers);


// 
router.param('userId', userById);

export default router;