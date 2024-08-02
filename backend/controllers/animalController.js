import asyncHandler from '../middleware/asyncHandler.js';
import Animal from '../models/animalModel.js';

// @desc    Fetch all products
// @route   GET /api/animals
// @access  Public
const getAnimals = asyncHandler(async (req, res) => {
    const animals = await Animal.find({});      // Display all animals without limits
    res.json(animals);
});

// @desc    Fetch a products
// @route   GET /api/animals/:id
// @access  Public
const getAnimalByID = asyncHandler(async (req, res) => {
    const animal = await Animal.findById(req.params.id);      // Display a animal
    
    if (animal) {
        return res.json(animal);
    } else {
        res.status(404).json({message: 'Animal couldn\'t be found'});
    }
});

export { getAnimals, getAnimalByID };