/**
 * Project: AnimalShelter
 * File: animal.test.js
 * Author: Jarrale Butts
 * Created: 2024-08-19
 * Purpose: Jest test cases for Animal Service functions, focusing on CRUD operations.
 *          Tests for creating, retrieving, listing, and deleting animals.
 */

import mongoose from 'mongoose'
import { describe, expect, test, beforeEach } from '@jest/globals'
import {
  createAnimal,
  listAllAnimals,
  listAnimalsByBreed,
  getAnimalById,
  deleteAnimal,
} from '../services/animals.js'
import { Animal } from '../db/models/animalModel.js'

// Test designed to pass with all properties.
describe('creating animals', () => {
  test('with all parameters should succeed', async () => {
    const animal = {
      age_upon_outcome: '31 years',
      animal_id: '',
      animal_type: 'Dog',
      breed: 'Lab',
      color: 'Black',
      date_of_birth: new Date(Date.UTC(1970, 0, 1, 0, 0, 2)), // Exact date from database document.
      datetime: new Date(Date.UTC(1970, 0, 1, 0, 0, 2, 2)), // Exact datetime from database document.
      monthyear: null,
      name: 'Spike',
      outcome_subtype: '',
      outcome_type: 'Adopted',
      sex_upon_outcome: 'Neutered Male',
      location_lat: 30.5066578739455,
      location_long: -97.3408780722188,
      age_upon_outcome_in_weeks: 156.767857142857,
    }
    const createdAnimal = await createAnimal(animal)
    // Verify an animal is returned with an ID, using expect() from Jest and the toBeInstanceOf matcher to verify that it is an ObjectId.
    expect(createdAnimal._id).toBeInstanceOf(mongoose.Types.ObjectId)
    // Use Mongoose directly to find the animal with the given ID.
    const foundAnimal = await Animal.findById(createdAnimal._id)
    // Found animal should contain properties of the original animal object defined including timestamps.
    expect(foundAnimal).toEqual(expect.objectContaining(animal))
    expect(foundAnimal.createdAt).toBeInstanceOf(Date)
    expect(foundAnimal.updatedAt).toBeInstanceOf(Date)
  })

  // Test designed to fail by leaving animal_type empty.
  test('without animal_type should fail', async () => {
    const animal = {
      age_upon_outcome: '31 years',
      animal_id: '',
      animal_type: '',
      breed: 'Lab',
      color: 'Black',
      date_of_birth: new Date(Date.UTC(1970, 0, 1, 0, 0, 2)),
      datetime: new Date(Date.UTC(1970, 0, 1, 0, 0, 2, 2)),
      monthyear: null,
      name: 'Spike',
      outcome_subtype: '',
      outcome_type: 'Adopted',
      sex_upon_outcome: 'Neutered Male',
      location_lat: 30.5066578739455,
      location_long: -97.3408780722188,
      age_upon_outcome_in_weeks: 156.767857142857,
    }
    try {
      await createAnimal(animal)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`animal_type` is required')
    }
  })

  // Test designed to pass using required only properties.
  test('with minimal parameters should succeed', async () => {
    const animal = {
      age_upon_outcome: '31 years',
      animal_type: 'Dog',
      breed: 'Lab',
      color: 'Black',
      date_of_birth: new Date(Date.UTC(1970, 0, 1, 0, 0, 2, 2)),
      datetime: new Date(Date.UTC(1970, 0, 1, 0, 0, 2, 2)),
      outcome_type: 'Adopted',
      sex_upon_outcome: 'Neutered Male',
      location_lat: 30.5066578739455,
      location_long: -97.3408780722188,
      age_upon_outcome_in_weeks: 156.767857142857,
    }
    const createdAnimal = await createAnimal(animal)
    expect(createdAnimal._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})

// Sample animal data used for testing list functionality.
const sampleAnimals = [
  {
    age_upon_outcome: '31 years',
    animal_id: '',
    animal_type: 'Dog',
    breed: 'Huskey',
    color: 'Black',
    date_of_birth: new Date(Date.UTC(1970, 0, 1, 0, 0, 2)),
    datetime: new Date(Date.UTC(1970, 0, 1, 0, 0, 2, 2)),
    monthyear: null,
    name: 'Max',
    outcome_subtype: '',
    outcome_type: 'Adopted',
    sex_upon_outcome: 'Neutered Male',
    location_lat: 30.5066578739455,
    location_long: -97.3408780722188,
    age_upon_outcome_in_weeks: 156.767857142857,
  },
  {
    age_upon_outcome: '31 years',
    animal_id: '',
    animal_type: 'Cat',
    breed: 'Long Hair',
    color: 'Black',
    date_of_birth: new Date(Date.UTC(1970, 0, 1, 0, 0, 2)),
    datetime: new Date(Date.UTC(1970, 0, 1, 0, 0, 2, 2)),
    monthyear: null,
    name: 'Felix',
    outcome_subtype: '',
    outcome_type: 'Adopted',
    sex_upon_outcome: 'Neutered Male',
    location_lat: 30.5066578739455,
    location_long: -97.3408780722188,
    age_upon_outcome_in_weeks: 156.767857142857,
  },
  {
    age_upon_outcome: '31 years',
    animal_id: '',
    animal_type: 'Dog',
    breed: 'Huskey',
    color: 'Black',
    date_of_birth: new Date(Date.UTC(1970, 0, 1, 0, 0, 2)),
    datetime: new Date(Date.UTC(1970, 0, 1, 0, 0, 2, 2)),
    monthyear: null,
    name: 'Rex',
    outcome_subtype: '',
    outcome_type: 'Adopted',
    sex_upon_outcome: 'Neutered Male',
    location_lat: 30.5066578739455,
    location_long: -97.3408780722188,
    age_upon_outcome_in_weeks: 156.767857142857,
  },
  {
    age_upon_outcome: '31 years',
    animal_type: 'Dog',
    breed: 'Boxer',
    color: 'Tan',
    date_of_birth: new Date(Date.UTC(1970, 0, 1, 0, 0, 2, 2)),
    datetime: new Date(Date.UTC(1970, 0, 1, 0, 0, 2, 2)),
    outcome_type: 'Adopted',
    sex_upon_outcome: 'Neutered Male',
    location_lat: 30.5066578739455,
    location_long: -97.3408780722188,
    age_upon_outcome_in_weeks: 156.767857142857,
  },
]

// Array to store the created sample animals.
let createdSampleAnimals = []

// Before each test, clear the database and populate it with the sample animals.
beforeEach(async () => {
  await Animal.deleteMany({})
  createdSampleAnimals = []
  for (const animal of sampleAnimals) {
    const createdAnimal = new Animal(animal)
    createdSampleAnimals.push(await createdAnimal.save())
  }
})

// Check that the number of retrieved animals matches the number of created sample animals in the database.
describe('listing animals', () => {
  test('should return all animals', async () => {
    const animals = await listAllAnimals()
    expect(animals.length).toEqual(createdSampleAnimals.length)
  })

  test('should be able to filter animals by breed', async () => {
    const animals = await listAnimalsByBreed('Huskey')
    // Check that two animals of the 'Huskey' breed were returned.
    expect(animals.length).toBe(2)
  })
})

// Tests for retrieving a single animal by its ID.
describe('getting an animal', () => {
  test('should return an animal', async () => {
    const animal = await getAnimalById(createdSampleAnimals[0]._id)
    expect(animal.toObject()).toEqual(createdSampleAnimals[0].toObject())
  })

  test('should fail if the id does not exist', async () => {
    const animal = await getAnimalById('000000000000000000000000')
    expect(animal).toEqual(null)
  })
})

// Tests for deleting animals from the database.
describe('deleting animals', () => {
  test('should remove the animal from the database', async () => {
    const result = await deleteAnimal(createdSampleAnimals[0]._id)
    expect(result.deletedCount).toEqual(1)
    const deletedAnimal = await Animal.findById(createdSampleAnimals[0]._id)
    expect(deletedAnimal).toEqual(null)
  })

  test('should fail if the id does not exist', async () => {
    const result = await deleteAnimal('000000000000000000000000')
    expect(result.deletedCount).toEqual(0)
  })
})
