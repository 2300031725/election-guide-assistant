// src/utils.ts

export const checkAge = (age: number | string): boolean => {
  const parsedAge = typeof age === 'string' ? parseInt(age, 10) : age;
  if (isNaN(parsedAge) || parsedAge < 0) return false;
  return parsedAge >= 18;
};

export const validateState = (state: string): boolean => {
  if (!state || state.trim() === "") return false;
  const validStates = ["andhra pradesh", "telangana", "karnataka", "tamil nadu", "kerala", "maharashtra"];
  return validStates.includes(state.toLowerCase().trim());
};

export const getDaysUntilElection = (electionDateString: string): number => {
  const electionDate = new Date(electionDateString);
  const today = new Date();
  const diffTime = Math.abs(electionDate.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return diffDays;
};
