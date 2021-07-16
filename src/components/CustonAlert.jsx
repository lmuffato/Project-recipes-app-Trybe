/*
este componente é renderizado com uma mensagem de alerta,
esta mensagem deve ficar em posição absoluta no meio da tela
e ficar na tela por 2 segundos
*/

import React from 'react';
import PropTypes from 'prop-types';
import '../styleSheets/CustonAlert.css';

function CustonAlert(props) {
  const { message } = props;
  return (
    <div
      className="alert-container"
    >
      {message}
    </div>
  );
}

CustonAlert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default CustonAlert;
