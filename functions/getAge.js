function addHours(numOfHours, date = new Date()) {
  const dateCopy = new Date(date.getTime());

  dateCopy.setTime(dateCopy.getTime() + numOfHours * 60 * 60 * 1000);

  return dateCopy;
}

export const getAge = (birthday) => {
  const birthdayDate = new Date(birthday);
  const now = new Date();
  const koreanDate = addHours(9, birthdayDate);
  const koreanNow = addHours(9, now);
  console.log(koreanDate, koreanNow);

  return koreanNow.getFullYear() - koreanDate.getFullYear() + 1;
};
