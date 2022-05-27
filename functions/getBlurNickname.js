export const getBlurNickname = (nickname) => {
  let blurNickname;
  blurNickname = nickname?.slice(0, 1);
  for (let i = 0; i < nickname?.length - 1; i++) {
    blurNickname += "*";
  }
  return blurNickname;
};
