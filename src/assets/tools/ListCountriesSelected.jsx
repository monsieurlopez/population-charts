//import React from "react";
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import closeIcon from '../images/svg/close-icon.svg'

export const ListCountriesSelected = ({ selectedCountries, setSelectedCountries }) => {

  // Delete one country selected
  const removeCountry = (iso3) => {
    // Filtra el array para eliminar el país
    const updatedSelection = selectedCountries.filter((country) => country.iso3 !== iso3);
    setSelectedCountries(updatedSelection);
  };

  return (
    <div className='listCountries__container'>
      {selectedCountries.map((country) => (
          <Button
            key={country.iso3}
            variant="light"
            size="sm"
            className='listCountries__elements'
            onClick={() => removeCountry(country.iso3)} // Eliminar el país al hacer clic
          >
            {country.name} <img src={closeIcon} alt="close icon" style={{ width: '0.5rem' }}/>
          </Button>
      ))}
    </div>
  );
};

ListCountriesSelected.propTypes = {
  selectedCountries: PropTypes.arrayOf(
    PropTypes.shape({
      iso3: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  setSelectedCountries: PropTypes.func.isRequired,
};
