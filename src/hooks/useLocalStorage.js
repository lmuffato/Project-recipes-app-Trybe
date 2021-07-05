export default function useLocalStorage(key) {
  const item = localStorage.getItem(key);
  return JSON.parse(item);
}
