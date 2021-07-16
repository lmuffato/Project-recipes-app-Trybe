import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Popup } from 'semantic-ui-react';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipeItem(Props) {
  const { data, index } = Props;
  const contextRef = React.useRef();
  const [open, setOpen] = React.useState(false);
  const handleShare = () => {
    const SEC = 3000;
    copy(`http://localhost:3000/${data.type}s/${data.id}`);
    setOpen((prevOpen) => !prevOpen);
    setTimeout(() => {
      setOpen((prevOpen) => !prevOpen);
    }, SEC);
  };
  const topText = data.type === 'comida'
    ? `${data.area} - ${data.category}`
    : `${data.alcoholicOrNot}`;
  return (
    <Item style={ { padding: 0 } }>
      <Item.Image>
        <Link to={ `/${data.type}s/${data.id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            alt="food/drink"
            src={ data.image }
            style={ { maxHeight: 120 } }
          />
        </Link>
      </Item.Image>
      <Item.Content>
        <Item.Meta
          data-testid={ `${index}-horizontal-top-text` }
        >
          {topText}
        </Item.Meta>
        <Item.Header data-testid={ `${index}-horizontal-name` }>
          <Link to={ `/${data.type}s/${data.id}` }>
            {data.name}
          </Link>
        </Item.Header>
        <Item.Extra>
          <Popup
            context={ contextRef }
            content="Link copiado!"
            position="bottom center"
            open={ open }
          />
          <Button
            style={ { background: 'none' } }
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            onClick={ handleShare }
          >
            <img
              src={ shareIcon }
              alt="share-icon"
              ref={ contextRef }
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
