import express from 'express';
const router = express.Router();

import { requireSignin } from '../controllers/auth_controller.js';
import { getAll, userById } from '../controllers/user_controller.js';


router.get('/users', getAll)
router.get('/users/:userId', userById)

router.get('/secret', requireSignin(), (req, res) => {
  res.json({user: 'yay'});
});

router.param('userId', userById);

export default router;