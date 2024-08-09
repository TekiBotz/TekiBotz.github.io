import asyncHandler from '../middleware/asyncHandler.js';
import Animal from '../models/animalModel.js';

// @desc    Fetch all animals
// @route   GET /api/animals
// @access  Public
const getAnimals = asyncHandler(async (req, res) => {
	const pagesize = 12;	// Limits the number of animals displayed per page
	const page = Number(req.query.pageNumber) || 1;  // Current page, default page 1

	// Search keyword, filters animals by breed
	const keyword = req.query.keyword 
		? { 
				breed: { 
					$regex: req.query.keyword,	// Allows for partial matching of keyword
					$options: 'i',	// Case-insensitive search
		 		} 
			}
		: {};

	// Count the total number of documents that match the keyword filter
	const count = await Animal.countDocuments({ ...keyword });


	// Fetch animals from the database with pagination and keyword filter
	const animals = await Animal
		.find({ ...keyword })
		.limit(pagesize)
		.skip(pagesize * (page - 1));
	res.json({ animals, page, pages: Math.ceil(count / pagesize) });
});


// @desc    Fetch a animal
// @route   GET /api/animals/:id
// @access  Public
const getAnimalByID = asyncHandler(async (req, res) => {
	// Find one animal by it's ID from the database
	const animal = await Animal.findById(req.params.id);
	
	if (animal) {
		return res.json(animal);
	} else {
		res.status(404);
		throw new Error('Animal couldn\'t be found');
	}
});

export { getAnimals, getAnimalByID };