/**
 * Project: AnimalRescue
 * File: dateUtils.js
 * Author: Jarrale Butts
 * Created: 2024-09-16
 * Purpose: Calculates the age of an animal in years and months based on its birth date.
 */

export const calculateAge = (birthDateString) => {
  // Converts birth date string to a Date object
  const birthDate = new Date(birthDateString);
  const currentDate = new Date();
  
  // Calculates the difference in years and months between the current date and birth date
  const years = currentDate.getFullYear() - birthDate.getFullYear();
  const months = currentDate.getMonth() - birthDate.getMonth();
  
  let ageYears = years;
  let ageMonths = months;
  
  // Adjust the year if months are negative
  if (months < 0) {
    ageYears--;
    ageMonths = 12 + months;
  }
  
  // Adjust the month if the current day is less than the birth day
  if (currentDate.getDate() < birthDate.getDate()) {
    ageMonths--;
    if (ageMonths < 0) {
      ageYears--;
      ageMonths = 11;
    }
  }

  // Returns age as an object with years and months
  return { years: ageYears, months: ageMonths };
};