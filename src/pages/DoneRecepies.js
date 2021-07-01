import React from 'react';
import Share from '../images/shareIcon.svg';

function DoneRecepies () {
  // myDoneRecepies = array com as receitas feitas
  return(
    <div>
    <button
    data-testid="filter-by-all-btn"
    >
      All
    </button>
    <button
      data-testid="filter-by-food-btn"
    >
      Food
    </button>
    <button
      data-testid="filter-by-drink-btn"
    >
      Drinks
    </button>
    {myDoneRecepies.map((recepie, index) => {
      if (recepie.type === meal) {
        <div>
        <img data-testid={`${index}-horizontal-image`}>{ recepie.img }</img>
        <p data-testid={`${index}-horizontal-top-text>`}>{recepie.category}</p>
        <p data-testid={`${index}-horizontal-name`}>{recepie.name}</p>
        <p data-testid={`${index}-horizontal-done-date`}>{recepie.date}</p>
        <img data-testid={`${index}-horizontal-share-btn`} src={Share} alt="share"></img>
        <p data-testid={`${index}-${tagName}-horizontal-tag`}>{recepie.tag}</p>
      }
      </div>
  )}}
      </div>
  )
}

export default DoneRecepies;