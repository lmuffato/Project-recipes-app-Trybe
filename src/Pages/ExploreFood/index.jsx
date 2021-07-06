import React from 'react';
import PropTypes from 'prop-types';
import ExploreFood from '../../Components/ExploreFood';
import Footer from '../../Components/Footer';

function ExploreFoodOpt() {
  return (
    <div>
      <ExploreFood />
      <Footer />
    </div>
  );
}

ExploreFoodOpt.propTypes = {
  header: PropTypes.string,
}.isRequired;

export default ExploreFoodOpt;
