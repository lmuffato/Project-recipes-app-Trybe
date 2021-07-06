import React from 'react';

function DetailsCard({ product, idn }) {
  const [ingredients, setIngredients] = React.useState([]);

  const pickIngredients = () => {
    const initIngredients = [];
    for (let i = 1; i <= 20; i += 1) {
      product.forEach((elem) => {
        initIngredients.push(elem[`strIngredient${i}`]);
      });
    }
    return (
      <ul>
        {initIngredients.map((ingredient, index) => {
          if (ingredient.length !== 0) {
            return (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ ingredient }
              >
                {ingredient}
              </li>
            );
          }
          return null;
        })}
      </ul>
    );
  };

  return (
    <section>
      {product.map((elem) => (
        <div key={ `id${idn[1]}` }>
          {console.log(elem)}
          <img src={ elem[`str${idn[1]}Thumb`] } data-testid="recipe-photo" />
          <h2 data-testid="recipe-title">{elem[`str${idn[1]}`]}</h2>

          <h3 data-testid="recipe-category">{elem.strCategory}</h3>
          { pickIngredients() }
          <h3 data-testid="instructions">{elem.Instructions}</h3>
          <video width="240" height="240" controls autplay>
            <source src={ elem.strYoutube } type="video/mp4" />
          </video>
        </div>
      ))}
    </section>
  );
}

export default DetailsCard;
