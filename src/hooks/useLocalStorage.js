export default function useLocalStorage(...keys) {
  const items = {};
  keys.forEach((key) => {
    const localStorageKey = localStorage.getItem(key);
    if (localStorageKey) {
      const needsToParse = localStorageKey.includes('[') || localStorageKey.includes('{');
      items[key] = needsToParse ? JSON.parse(localStorageKey) : localStorageKey;
    }
  });
  return items;
}
