/**
 * Project: AnimalShelter
 * File: test/globalTeardown.js
 * Author: Jarrale Butts
 * Created: 2024-08-20
 * Purpose: Stops the MongoDB instance when tests are finished
 */

export default async function globalTeardown() {
  await global.__MONGOINSTANCE.stop()
}
