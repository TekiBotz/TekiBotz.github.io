// Calculates age from a given birth date string.
export const calculateAge = (birthDateString) => {
    const birthDate = new Date(birthDateString);
    const currentDate = new Date();
    
    const years = currentDate.getFullYear() - birthDate.getFullYear();
    const months = currentDate.getMonth() - birthDate.getMonth();
    
    let ageYears = years;
    let ageMonths = months;
    
    // Adjust age if the current month is before the birth month
    if (months < 0) {
      ageYears--;
      ageMonths = 12 + months;
    }
    
    // Adjust age if the current day is before the birth day
    if (currentDate.getDate() < birthDate.getDate()) {
      ageMonths--;
      if (ageMonths < 0) {
        ageYears--;
        ageMonths = 11;
      }
    }
  
    return { years: ageYears, months: ageMonths };
};
  