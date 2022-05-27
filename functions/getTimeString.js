export const getTimeString = (createdAt) => {
  const createdTime = new Date(createdAt);
  const now = new Date();
  let timeString;

  if (
    now.getFullYear() === createdTime.getFullYear() &&
    now.getMonth() === createdTime.getMonth() &&
    now.getDate() === createdTime.getDate()
  ) {
    let hours = createdTime?.getHours();
    let minutes = createdTime?.getMinutes();

    timeString = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
  } else {
    timeString = `${createdTime?.getMonth() + 1}/${createdTime?.getDate()}`;
  }
  return timeString;
};
