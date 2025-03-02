import React from "react";
import PropTypes from 'prop-types';
import { Badge, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ListCountriesSelected = ({ selectedCountries, setSelectedCountries }) => {

  // Delete one country selected
  const removeCountry = (iso3) => {
    // Filtra el array para eliminar el país
    const updatedSelection = selectedCountries.filter((country) => country.iso3 !== iso3);
    setSelectedCountries(updatedSelection);
  };

  return (
    <div className='my-2'>
      {selectedCountries.map((country) => (
        <Badge key={country.iso3} pill bg="dark" className="mr-2" style={{ padding: "8px", marginRight: "5px" }}>
          {country.name}
          <Button
            variant="light"
            size="sm"
            style={{ marginLeft: "8px", padding: "0px 5px", borderRadius: "50%" }}
            onClick={() => removeCountry(country.iso3)} // Eliminar el país al hacer clic
          >
            ✖
          </Button>
        </Badge>
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
