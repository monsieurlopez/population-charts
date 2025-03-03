import { useState } from "react";
import "./Main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CreateTable } from "../tools/CreateTable.jsx";
import { CreateChart } from "../tools/CreateChart.jsx";
import { ListCountriesSelected } from "../tools/ListCountriesSelected.jsx";
//* Style CSS *//
import "../tools/styles/CreateChart.css";


export const Main = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [populationData, setPopulationData] = useState({ data: [] });

  const handleSelectionChange = (countries) => {
    setSelectedCountries(countries);
  };

  return (
    <main className="main">
      <section className="section section__listCountries">
        <ListCountriesSelected
          selectedCountries={selectedCountries}
          setSelectedCountries={setSelectedCountries}
        />
      </section>
      <section className="section section__table">
        <CreateTable
          onSelectionChange={handleSelectionChange}
          selectedCountries={selectedCountries}
          setPopulationData={setPopulationData}
        />
      </section>
      <section className="section section__chart">
        <CreateChart
          selectedCountries={selectedCountries}
          populationData={populationData}
        />
      </section>
    </main>
  );
};
