/**
 * Project: AnimalShelter
 * File: routes/animals.js
 * Author: Jarrale Butts
 * Created: 2024-08-19
 * Purpose: Defines HTTP routes for managing animal data, listing, retrieving, creating, and deleting animals.
 */

import {
  listAllAnimals,
  listAnimalsByBreed,
  // listAnimalsByAnimalType,
  getAnimalById,
  createAnimal,
  deleteAnimal,
} from '../services/animals.js'
import { requireAuth } from '../middleware/jwt.js'

export function animalRoutes(app) {
  // Route to get a list of animals, with optional filtering by breed or animal type, and sorting options.
  app.get('/api/v1/animals', async (req, res) => {
    const { breed } = req.query
    const options = {
      skip: parseInt(req.query.skip) || 0,
      limit: parseInt(req.query.limit) || 10,
    }
    try {
      if (breed) {
        // Lists animals filtered by breed.
        return res.json(await listAnimalsByBreed(breed, options))
      } else {
        // Lists all animals.
        return res.json(await listAllAnimals(options))
      }
    } catch (err) {
      console.error('error listing animals', err)
      return res.status(500).end()
    }
  })

  // Route to get a single animal by its ID.
  app.get('/api/v1/animals/:id', async (req, res) => {
    const { id } = req.params
    try {
      const animal = await getAnimalById(id)
      if (animal === null) return res.status(404).end()
      return res.json(animal)
    } catch (err) {
      console.error('error getting animal', err)
      return res.status(500).end()
    }
  })

  // Route to create a new animal entry.
  app.post('/api/v1/animals', requireAuth, async (req, res) => {
    try {
      const animal = await createAnimal(req.body)
      return res.json(animal)
    } catch (err) {
      console.error('error creating animal', err)
      return res.status(500).end()
    }
  })

  // Route to delete an existing animal by its ID.
  app.delete('/api/v1/animals/:id', requireAuth, async (req, res) => {
    try {
      const { deletedCount } = await deleteAnimal(req.params.id)
      if (deletedCount === 0) return res.sendStatus(404)
      return res.status(204).end()
    } catch (err) {
      console.error('error deleting animal', err)
      return res.status(500).end()
    }
  })
}
