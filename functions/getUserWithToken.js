export async function getUserWithToken(token) {
  const headers = {
    Authorization: `Token ${token}`,
  };
  try {
    const user = await axios.get(`${key.API}/user/`, { headers });

    return user.data;
  } catch (error) {
    return false;
  }
}
