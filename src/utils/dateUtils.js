/**
 * Project: AnimalShelter
 * File: utils/dateUtils.js
 * Author: Jarrale Butts
 * Created: 2024-08-15
 * Purpose: Calculate age from a given birth date string.
 */

export const calculateAge = (birthDateString) => {
  // Convert the birth date string to a Date object
  const birthDate = new Date(birthDateString)
  const currentDate = new Date()

  // Calculate the difference in years and months
  const years = currentDate.getFullYear() - birthDate.getFullYear()
  const months = currentDate.getMonth() - birthDate.getMonth()

  let ageYears = years
  let ageMonths = months

  // Adjust age if the current month is before the birth month
  if (months < 0) {
    ageYears--
    ageMonths = 12 + months
  }

  // Adjust age if the current day is before the birth day
  if (currentDate.getDate() < birthDate.getDate()) {
    ageMonths--
    if (ageMonths < 0) {
      ageYears--
      ageMonths = 11
    }
  }

  // Return the age as an object with years and months
  return { years: ageYears, months: ageMonths }
}
