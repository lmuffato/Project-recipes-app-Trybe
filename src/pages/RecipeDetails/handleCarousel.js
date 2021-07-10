let nextActiveId = null;
let activeId = null;
const NUM_4 = 4;
const NUM_5 = 5;
const classNameActive = 'carousel active';
const recipesShown = document.getElementsByClassName(classNameActive);

export function handlePrev() {
  if (recipesShown[0].id === '0' && recipesShown[1].id === '5') {
    activeId = Number(recipesShown[0].id);
    recipesShown[0].className = 'carousel';
    nextActiveId = NUM_4;
  } else {
    activeId = Number(recipesShown[1].id);
    recipesShown[1].className = 'carousel';
    if (activeId > 1) {
      nextActiveId = activeId - 2;
    } else {
      nextActiveId = NUM_5;
    }
  }
  document.getElementById(nextActiveId).className = classNameActive;
}

export function handleNext(recommended) {
  if (recipesShown[0].id === '0' && recipesShown[1].id === '5') {
    activeId = Number(recipesShown[1].id);
    recipesShown[1].className = 'carousel';
    nextActiveId = 1;
  } else {
    activeId = Number(recipesShown[0].id);
    recipesShown[0].className = 'carousel';
    if (activeId < recommended.length - 2) {
      nextActiveId = activeId + 2;
    } else {
      nextActiveId = 0;
    }
  }
  document.getElementById(nextActiveId).className = classNameActive;
}
