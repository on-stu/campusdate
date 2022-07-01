import scores from "../lib/scores.json";

type scoreObjectType = {
  [key: string]: Array<number>;
};

const ideals: scoreObjectType = scores.ideals;
const hobbies: scoreObjectType = scores.hobbies;

export const calculateIdeals = (idealsArray: Array<string>): Array<number> => {
  let resultArray = [0, 0, 0, 0, 0, 0, 0];
  let tempArray = [];
  for (let i = 0; i < idealsArray.length; i++) {
    const tempIdeal = idealsArray[i];
    const idealScore: Array<number> = ideals[tempIdeal];
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

export const calculateHobbies = (
  hobbiesArray: Array<string>
): Array<number> => {
  let resultArray = [0, 0, 0, 0];
  let tempArray = [];
  for (let i = 0; i < hobbiesArray.length; i++) {
    const tempHobbies = hobbiesArray[i];
    const hobbyScore = hobbies[tempHobbies];
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
