import { useState } from "react";
import PropTypes from "prop-types";
import "./Main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CreateTable } from "../tools/CreateTable.jsx";
import { CreateChart } from "../tools/CreateChart.jsx";
import { ListCountriesSelected } from "../tools/ListCountriesSelected.jsx";
//* Style CSS *//
import "../tools/styles/CreateChart.css";
import "../tools/styles/ListCountries.css";

export const Main = ({ view }) => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [populationData, setPopulationData] = useState({ data: [] });

  const handleSelectionChange = (countries) => {
    setSelectedCountries(countries);
  };

  return (
    <main className="main">
      <section className="section section__listCountries">
        {selectedCountries.length > 0 ? (
          <ListCountriesSelected
            selectedCountries={selectedCountries}
            setSelectedCountries={setSelectedCountries}
          />
        ) : (
          <h3 className="listCountries__text">No countries selected</h3>
        )}
      </section>
      <section className={`section ${view === 'table' ? 'section__table' : 'd-none'}`}>
        <CreateTable
          onSelectionChange={handleSelectionChange}
          selectedCountries={selectedCountries}
          setPopulationData={setPopulationData}
        />
      </section>
      <section className={`section ${view === 'chart' ? 'section__chart' : 'd-none'}`}>
        <CreateChart
          selectedCountries={selectedCountries}
          populationData={populationData}
        />
      </section>
    </main>
  );
};

Main.propTypes = {
  view: PropTypes.string.isRequired,
};


