//import React from "react";
import PropTypes from "prop-types";

export const ListCountriesSelected = ({ selectedCountries }) => {
  return (
    <div>
      <h4>Selected Countries</h4>
      <ul>
        {selectedCountries.map((country) => (
          <li key={country.iso3}>{country.name}</li>
        ))}
      </ul>
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
};
