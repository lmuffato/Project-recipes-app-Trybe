import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import fetchCountries from '../service/fetchCountries';

export default function CountryFlag({ flag }) {
  const [countriesApi, setCountriesApi] = useState([]); // Recebe o retorno da api
  // Esse elemento pode vir como props
  const [countryCard, setCountryCard] = useState(''); // pais do card

  useEffect(() => {
    setCountryCard(flag); // exemplo
  }, [flag]);

  useEffect(() => {
    const responseApi = async () => {
      const response = await fetchCountries();
      setCountriesApi(response);
    };
    responseApi();
  });

  const returnFlagCountryCard = () => {
    let countryFlag = {};
    if (countriesApi.length) {
      countryFlag = countriesApi.find((pais) => pais.demonym === countryCard);
      return countryFlag;
    }
    return null;
  };

  useEffect(() => {
    const data = returnFlagCountryCard();
    setCountryCard(data);
  }, []);

  return (
    countriesApi.length && <Image src={ returnFlagCountryCard().flag } />
  );
}

CountryFlag.propTypes = {
  flag: PropTypes.string.isRequired,
};

const Image = styled.img`
  width: 20px;
  height: 10px;
  margin: 0;
`;
