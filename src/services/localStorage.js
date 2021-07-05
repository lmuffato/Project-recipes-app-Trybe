export default function setTokenLocalStorage(userEmail) {
  const Obj = { email: userEmail };
  localStorage.setItem('mealsToken', JSON.stringify(1));
  localStorage.setItem('cocktailsToken', JSON.stringify(1));
  localStorage.setItem('user', JSON.stringify(Obj));
}

export function getEmail(key) {
  return JSON.parse(localStorage.getItem(key));
}
