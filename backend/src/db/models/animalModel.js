/**
 * Project: AnimalShelter
 * File: animalModel.js
 * Author: Jarrale Butts
 * Created: 2024-08-19
 * Purpose: Models the schema for an animal taliored after the AAC database, animals collection,
 *          specifing properties and the corresponding types
 */

import mongoose, { Schema } from 'mongoose'

const animalSchema = new Schema(
  {
    age_upon_outcome: {
      type: String,
      required: true,
    },
    animal_id: {
      type: String,
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
    },
    name: {
      type: String,
    },
    outcome_subtype: {
      type: String,
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
  },
  { timestamps: true },
)

// Creates the mongoose model
export const Animal = mongoose.model('animal', animalSchema)
