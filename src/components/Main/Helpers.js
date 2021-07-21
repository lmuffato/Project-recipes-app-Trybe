export default function zipName(recipeName, numOfCharacters) {
  let compactedName = recipeName.slice(0, numOfCharacters);

  if (recipeName.length > numOfCharacters) {
    compactedName = recipeName.slice(0, numOfCharacters).concat('...');
  }

  return compactedName;
}
