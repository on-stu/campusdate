import scores from "../lib/scores.json";

export const calculateIdeals = (idealsArray) => {
  let resultArray = [0, 0, 0, 0, 0, 0, 0];
  let tempArray = [];
  for (let i = 0; i < idealsArray.length; i++) {
    const tempIdeal = idealsArray[i];
    const idealScore = scores.ideals[tempIdeal];
    tempArray.push(idealScore);
  }
  for (let i = 0; i < tempArray.length; i++) {
    for (let j = 0; j < tempArray[i].length; j++) {
      resultArray[j] += tempArray[i][j];
    }
  }
  for (let i = 0; i < resultArray.length; i++) {
    resultArray[i] /= idealsArray.length;
  }
  return resultArray;
};

export const calculateHobbies = (hobbiesArray) => {
  let resultArray = [0, 0, 0, 0];
  let tempArray = [];
  for (let i = 0; i < hobbiesArray.length; i++) {
    const tempHobbies = hobbiesArray[i];
    const hobbyScore = scores.hobbies[tempHobbies];
    tempArray.push(hobbyScore);
  }
  for (let i = 0; i < tempArray.length; i++) {
    for (let j = 0; j < tempArray[i].length; j++) {
      resultArray[j] += tempArray[i][j];
    }
  }
  for (let i = 0; i < resultArray.length; i++) {
    resultArray[i] /= hobbiesArray.length;
  }
  return resultArray;
};
