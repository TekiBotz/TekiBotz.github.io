/**
 * Project: AnimalRescue
 * File: animalModel.js
 * Author: Jarrale Butts
 * Created: 2024-09-24
 * Purpose: Mongoose schema for the animals collection, 
 *          modeled after the AAC database.
 */

import mongoose from "mongoose";

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