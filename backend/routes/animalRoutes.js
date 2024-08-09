import express from 'express';
const router = express.Router();
import { getAnimals, getAnimalByID } from '../controllers/animalController.js';

// Route to get all animals
router.route('/').get(getAnimals);

// Route to get a specific animal by ID
router.route('/:id').get(getAnimalByID);

export default router;