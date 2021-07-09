import React from 'react';
import PropTypes from 'prop-types';
import { BiArrowBack } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';

function HeaderBack({ title }) {
  const history = useHistory();
  const goBack = () => (
    history.goBack()
  );

  return (
    <header className={ styles.header }>
      <BiArrowBack onClick={ goBack } />
      { title }
    </header>
  );
}

HeaderBack.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeaderBack;
