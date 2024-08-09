import mongoose from "mongoose";

/*
* Schema modeled after AAC database, animals collection
* Timestamps exist as datetime field
*/
const animalSchema = new mongoose.Schema({
	age_upon_outcome: {
		type: String,
		required: true,
	},
	animal_id: {
		type: String,
		required: true,
		unique: true,
	},
	animal_type: {
		type: String,
		required: true,
	},
	breed: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
	date_of_birth: {
		type: Date,
		required: true,
	},
	datetime: {
		type: Date,
		required: true,
	},
	monthyear: {
		type: Date,
		required: true,
	},
	name: {
		type: String
	},
	outcome_subtype: {
		type: String
	},
	outcome_type: {
		type: String,
		required: true,
	},
	sex_upon_outcome: {
		type: String,
		required: true,
	},
	location_lat: {
		type: Number,
		required: true,
	},
	location_long: {
		type: Number,
		required: true,
	},
	age_upon_outcome_in_weeks: {
		type: Number,
		required: true,
	},
});

const Animal = mongoose.model('Animal', animalSchema);

export default Animal;