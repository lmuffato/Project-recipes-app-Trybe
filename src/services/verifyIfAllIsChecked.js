export default function verifyIfAllIsChecked(setShowButtonFinished) {
  const ingredientSteps = document.querySelectorAll('.ingredientStep');
  const stepsChecked = [...ingredientSteps].filter((step) => step.checked === true);
  if (ingredientSteps.length === stepsChecked.length) setShowButtonFinished(false);
  else setShowButtonFinished(true);
}
