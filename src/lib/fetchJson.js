export default async function fetchJson(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}
