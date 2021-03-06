function addHours(numOfHours: number, date = new Date()): Date {
  const dateCopy = new Date(date.getTime());

  dateCopy.setTime(dateCopy.getTime() + numOfHours * 60 * 60 * 1000);

  return dateCopy;
}

export const getAge = (birthday: number) => {
  const birthdayDate = new Date(birthday);
  const now = new Date();
  const koreanDate = addHours(9, birthdayDate);
  const koreanNow = addHours(9, now);

  return koreanNow.getFullYear() - koreanDate.getFullYear() + 1;
};
