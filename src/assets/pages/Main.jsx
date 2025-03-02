import { useState } from "react";
import "./Main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CreateTable } from "../tools/CreateTable.jsx";
import { ListCountriesSelected } from "../tools/ListCountriesSelected.jsx";

export const Main = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);

  const handleSelectionChange = (countries) => {
    setSelectedCountries(countries);
  };

  return (
    <main className="main text-center">
      <ListCountriesSelected selectedCountries={selectedCountries} setSelectedCountries={setSelectedCountries}/>
      <CreateTable onSelectionChange={handleSelectionChange} selectedCountries={selectedCountries} />
    </main>
  );
};
