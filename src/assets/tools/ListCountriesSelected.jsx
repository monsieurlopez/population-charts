//import React from "react";
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ListCountriesSelected = ({ selectedCountries }) => {
  return (
    <div>
      <div>
        {selectedCountries.map((country) => (
          <Badge key={country.iso3} pill bg="dark" className="mr-2">
            {country.name}
          </Badge>
        ))}
      </div>
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
