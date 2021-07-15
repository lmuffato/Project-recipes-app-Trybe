
// import React, { useState } from 'react';
// import { useHistory } from 'react-router';
// // import clipboardCopy from '../../services/clipboardCopy';
// import shareIcon from '../../images/shareIcon.svg';

// const copy = require('clipboard-copy');

// export default function ShareBtn() {
//   const [Url, setUrl] = useState(false);
//   const history = useHistory();

//   const handleClick = () => {
//     const URL = history.location.pathname.replace('in-progress', '');
//     copy(`http://localhost:3000${URL}`);
//     setUrl(true);
//   };

import React from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from '../../services/clipboardCopy';
import shareIcon from '../../images/shareIcon.svg';

export default function ShareBtn({ id, type }) {

  return (
    <div>
      <button
        type="button"

//         onClick={ handleClick }

        onClick={ () => clipboardCopy(type, id) }

        data-testid="share-btn"
      >
        <img
          src={ shareIcon }
          alt="Share Icon"
        />

//         {Url ? <span>Link copiado!</span> : null}
=======
        <p id={ `copyMessage${id}` }> Compartilhar </p>
      </button>
    </div>
  );
}


ShareBtn.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
}.isRequired;

