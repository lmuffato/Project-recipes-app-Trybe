import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FoodContext } from '../Context/FoodProvider';

const ButtonsCategory = ({ page, identifier }) => {
  const [categorys, setCategorys] = useState([]);
  const [clicks, setClicks] = useState({ name: '', clicks: 1 });
  const { setFoods, setCategory } = React.useContext(FoodContext);
  const endpoint = `https://www.${page}.com/api/json/v1/1/list.php?c=list`;

  useEffect(() => {
    const getCategorys = async () => {
      const request = await fetch(endpoint);
      const resolve = await request.json();
      setCategorys(resolve[identifier]);
    };
    setCategory(true);
    getCategorys();
  }, []);

  const handleClick = async (category) => {
    if (clicks.clicks !== 2) {
      if (clicks.name === category) {
        const response2 = await fetch(`https://www.${page}.com/api/json/v1/1/search.php?s=`);
        const json2 = await response2.json();
        setClicks({ name: '', clicks: 1 });
        setFoods(json2[identifier]);
      } else {
        const response = await fetch(`https://www.${page}.com/api/json/v1/1/filter.php?c=${category}`);
        const json = await response.json();
        setClicks({ name: category });
        setFoods(json[identifier]);
      }
    }
  };

  const handleClickAll = async () => {
    const response2 = await fetch(`https://www.${page}.com/api/json/v1/1/search.php?s=`);
    const json2 = await response2.json();
    setFoods(json2[identifier]);
  };

  return (
    <section>
      <button
        type="button"
        onClick={ handleClickAll }
        data-testid="All-category-filter"
      >
        All
      </button>
      {
        categorys.map((category, index) => {
          const maxLength = 4;
          if (index <= maxLength) {
            return (
              <button
                type="button"
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={ () => handleClick(category.strCategory) }
                key={ category.strCategory }
              >
                {category.strCategory}
              </button>
            );
          } return null;
        })
      }
    </section>
  );
};

ButtonsCategory.propTypes = {
  page: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
};

export default ButtonsCategory;
