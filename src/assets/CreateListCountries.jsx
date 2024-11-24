import React, { useEffect, useState } from 'react';
import { ListGroup, Spinner, Form } from 'react-bootstrap';
import { fetchCountries } from './Api.js';
import PropTypes from 'prop-types';

const CreateListCountries = ({ selectedCountries, onCountrySelect }) => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCountries()
            .then(countriesData => {
                setCountries(countriesData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
                setLoading(false);
            });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCheckboxChange = (country) => {
        // Usar la función onCountrySelect para actualizar el estado
        onCountrySelect(prev => {
            const updatedSet = new Set(prev);
            if (updatedSet.has(country)) {
                updatedSet.delete(country);
            } else {
                updatedSet.add(country);
            }
            return updatedSet;
        });
    };

    const filteredCountries = countries.filter(country =>
        country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groupedCountries = filteredCountries.reduce((acc, country) => {
        const firstLetter = country.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(country);
        return acc;
    }, {});

    return (
        <>
            <h4>List of Countries</h4>
            <Form.Control
                type="text"
                placeholder="Search for a country..."
                value={searchTerm}
                onChange={handleSearch}
                className="mb-2"
            />
            {loading ? (
                <Spinner animation="border" role="status" />
            ) : (
                <ListGroup className="overflow-y-auto mb-3">
                    {Object.keys(groupedCountries).map((letter) => (
                        <React.Fragment key={letter}>
                            <ListGroup.Item className="font-weight-bold">{letter}</ListGroup.Item>
                            {groupedCountries[letter].map((country, index) => (
                                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                    <label htmlFor={country} className="ml-2">
                                        {country}
                                    </label>
                                    <input
                                        type="checkbox"
                                        id={country}
                                        checked={selectedCountries.has(country)}
                                        onChange={() => handleCheckboxChange(country)}
                                    />
                                </ListGroup.Item>
                            ))}
                        </React.Fragment>
                    ))}
                </ListGroup>
            )}

        </>
    );
};

CreateListCountries.propTypes = {
    selectedCountries: PropTypes.instanceOf(Set).isRequired,
    onCountrySelect: PropTypes.func.isRequired,
};

export default CreateListCountries;
