import React from 'react';
import { Button, Item } from 'semantic-ui-react';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeItem(Props) {
  const { data, index } = Props;
  const topText = data.type === 'comida'
    ? `${data.area} - ${data.category}`
    : `${data.alcoholicOrNot}`;
  return (
    <Item style={ { padding: 0 } }>
      <Item.Image>
        <img data-testid={ `${index}-horizontal-image` } alt="oi" src={ data.image } />
      </Item.Image>
      <Item.Content>
        <Item.Meta
          data-testid={ `${index}-horizontal-top-text` }
        >
          {topText}
        </Item.Meta>
        <Item.Header data-testid={ `${index}-horizontal-name` }>{data.name}</Item.Header>
        <Item.Extra>
          <Button
            style={ { background: 'none' } }
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
          >
            <img
              src={ shareIcon }
              alt="share-icon"
            />
          </Button>
          <Button
            style={ { background: 'none' } }
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
          >
            <img src={ blackHeartIcon } alt="favorite icon" />
          </Button>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}

export default RecipeItem;
