import * as SecureStore from "expo-secure-store";

export async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValue(key) {
  const result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return false;
  }
}

export async function deleteItem(key) {
  await SecureStore.deleteItemAsync(key);
}
