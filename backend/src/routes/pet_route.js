import express from 'express';
const router = express.Router();


import { create, listAll, petById, update, single,remove } from '../controllers/pet_controller.js';
import { userById } from '../controllers/user_controller.js';


// router.get('/pets/:petId', read)



router.post('/pets/create/:userId', create);
router.put('/pets/:petId/:userId', update );

router.delete('/pets/:petId/:userId', remove );

router.get('/pets/:petId', single); //read
router.get('/pets', listAll);

//params
router.param('userId', userById)
router.param('petId', petById)


export default router;