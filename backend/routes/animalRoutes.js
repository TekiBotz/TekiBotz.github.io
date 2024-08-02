import express from 'express';
const router = express.Router();
import { getAnimals, getAnimalByID } from '../controllers/animalController.js';

router.route('/').get(getAnimals);
router.route('/:id').get(getAnimalByID);

export default router;