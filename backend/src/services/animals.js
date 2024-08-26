/**
 * Project: AnimalShelter
 * File: services/animal.js
 * Author: Jarrale Butts
 * Created: 2024-08-19
 * Purpose: Defines CRUD (Create, Read, Update, Delete) operations for the animal data.
 */

import { Animal } from '../db/models/animalModel.js'

// Defines the createAnimal function
export async function createAnimal({
  age_upon_outcome,
  animal_id,
  animal_type,
  breed,
  color,
  date_of_birth,
  datetime,
  monthyear,
  name,
  outcome_subtype,
  outcome_type,
  sex_upon_outcome,
  location_lat,
  location_long,
  age_upon_outcome_in_weeks,
}) {
  // Creates an instance of the Animal model
  const animalCreated = new Animal({
    age_upon_outcome,
    animal_id,
    animal_type,
    breed,
    color,
    date_of_birth,
    datetime,
    monthyear,
    name,
    outcome_subtype,
    outcome_type,
    sex_upon_outcome,
    location_lat,
    location_long,
    age_upon_outcome_in_weeks,
  })
  // Saves the new animal instance to the database
  return await animalCreated.save()
}

// Lists all animals with optional pagination.
export async function listAllAnimals({ skip, limit, ...options }) {
  // Lists all animals, applying pagination and sorting options.
  return await listAnimals({}, { ...options, skip, limit })
}

// Lists animals with optional filtering.
async function listAnimals(query = {}) {
  return await Animal.find(query)
}

// Lists animals filtered by breed
export async function listAnimalsByBreed(breed, options) {
  return await listAnimals({ breed }, options)
}

// Retrieves a single animal by its ID
export async function getAnimalById(animalId) {
  return await Animal.findById(animalId)
}

// Deletes an animal by its ID
export async function deleteAnimal(animalId) {
  return await Animal.deleteOne({ _id: animalId })
}
