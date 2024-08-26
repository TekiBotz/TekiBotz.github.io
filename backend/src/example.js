/**
 * Test functions
 */
import { initDatabase } from './db/init.js'
import { Animal } from './db/models/animalModel.js'

await initDatabase()

const animal = new Animal({
  age_upon_outcome: '31 years',
  animal_id: '',
  animal_type: 'Dog',
  breed: 'Lab',
  color: 'Black',
  date_of_birth: 2014 - 4 - 10,
  datetime: 2017 - 4 - 11,
  monthyear: '',
  name: 'Spike',
  outcome_subtype: '',
  outcome_type: 'Adopted',
  sex_upon_outcome: 'Neutered Male',
  location_lat: 30.5066578739455,
  location_long: -97.3408780722188,
  age_upon_outcome_in_weeks: 156.767857142857,
})

// Save the animal to the database
await animal.save()

// Find all animals
const animals = await Animal.find()
console.log(animals)
