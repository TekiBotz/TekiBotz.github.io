export const calculateAge = (birthDateString) => {
    const birthDate = new Date(birthDateString);
    const currentDate = new Date();
    
    const years = currentDate.getFullYear() - birthDate.getFullYear();
    const months = currentDate.getMonth() - birthDate.getMonth();
    
    let ageYears = years;
    let ageMonths = months;
    
    if (months < 0) {
      ageYears--;
      ageMonths = 12 + months; // months will be negative here
    }
    
    if (currentDate.getDate() < birthDate.getDate()) {
      ageMonths--;
      if (ageMonths < 0) {
        ageYears--;
        ageMonths = 11;
      }
    }
  
    return { years: ageYears, months: ageMonths };
};
  