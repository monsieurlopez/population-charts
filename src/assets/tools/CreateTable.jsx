import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { fetchCountries, fetchPopulationData } from "../Api.js";
import { DownloadTable } from "./DownloadTable.jsx";
//* Prime React Component *//
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
//* Bootstrap React Component *//
import Button from "react-bootstrap/Button";
import { Stack } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//* SVG Component *//
import ClearFilter from "../images/svg/filter-off-icon.svg";
import ButtonClearSelection from "../images/svg/filter_remove_icon.svg";
//* CSS style *//
import "./styles/CreateTable.css";

export const CreateTable = ({
  onSelectionChange,
  selectedCountries,
  setPopulationData,
}) => {
  const [populationData, setPopulationDataLocal] = useState(null);
  const [countries, setCountries] = useState([]);
  const [filters, setFilters] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const prevSelected = useRef([]);
  const dt = useRef(null);

  useEffect(() => {
    const getPopulation = async () => {
      const data = await fetchPopulationData();
      setPopulationDataLocal(data);
      setPopulationData(data);
    };
    getPopulation();
  }, [setPopulationData]);

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      if (populationData) {
        const countriesWithPopulation = data.map((country) => {
          const hasPopulation = populationData.data?.some(
            (pop) => pop.iso3 === country.iso3
          );
          return { ...country, hasPopulation };
        });
        setCountries(countriesWithPopulation);
      }
    };
    if (populationData) {
      getCountries();
      initFilters();
    }
  }, [populationData]);

  useEffect(() => {
    if (onSelectionChange) {
      if (
        JSON.stringify(prevSelected.current) !==
        JSON.stringify(selectedCountries)
      ) {
        prevSelected.current = selectedCountries;
        onSelectionChange(selectedCountries);
      }
    }
  }, [selectedCountries, onSelectionChange]);

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    setGlobalFilterValue("");
  };

  const clearFilter = () => {
    setFilters({ global: { value: null } });
    setGlobalFilterValue("");
  };

  const clearSelection = () => {
    onSelectionChange([]);
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      global: { value, matchMode: FilterMatchMode.CONTAINS },
    }));
    setGlobalFilterValue(value);
  };

  const flagTemplate = (rowData) => {
    return (
      <img
        src={rowData.flag}
        alt={rowData.name}
        style={{ width: 40, height: 20 }}
      />
    );
  };

  const paginatorLeft = () => {
    return (
      <DownloadTable countries={countries} selectedCountries={selectedCountries} dt={dt}/>
    );
  };
  const paginatorRight = () => {
    const text = selectedCountries.length !== 1 ? "países seleccionados" : "país seleccionado";
    return (
      <p className="m-2">
        {selectedCountries.length} {text}
      </p>
    );
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center">
        <Stack direction="horizontal" gap={1}>
          <Button
            variant="outline-secondary"
            onClick={clearSelection}
            size="sm"
            className="d-flex align-items-center"
          >
            <img
              src={ButtonClearSelection}
              alt="Icon clear selection"
              className="icon__clear-selection me-1"
            />
            Clear Selection
          </Button>
        </Stack>

        <IconField className="table__header-search w-lg-25">
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <InputIcon className="pi pi-search" />
            </span>
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Search"
              className="p-inputtext-sm"
              type="text"
            />
            <span className="p-inputgroup-addon">
              <img
                src={ClearFilter}
                alt="Icon clear filter"
                className="icon__clear-filter me-1"
                onClick={clearFilter}
                type="button"
              />
            </span>
          </div>
        </IconField>
      </div>
    );
  };

  return (
    <div className="container m-auto text-center">
      <DataTable
        value={countries}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        selectionMode="checkbox"
        selection={selectedCountries}
        onSelectionChange={(e) => onSelectionChange(e.value)}
        dataKey="iso3"
        filters={filters}
        globalFilterFields={["name", "capital", "iso3", "currency"]}
        header={renderHeader()}
        emptyMessage="No countries found."
        scrollable
        scrollHeight="550px"
        style={{ minWidth: "45rem" }}
        rowClassName={(rowData) => (!rowData.hasPopulation ? "p-disabled" : "")}
        paginatorLeft={paginatorLeft}
        paginatorRight={paginatorRight}
        id="table-countries"
        ref={dt}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column field="flag" header="Flag" body={flagTemplate} />
        <Column field="name" header="Country" sortable />
        <Column field="capital" header="Capital" sortable />
        <Column field="iso3" header="ISO Code" sortable />
        <Column field="currency" header="Currency" sortable />
      </DataTable>
    </div>
  );
};

CreateTable.propTypes = {
  onSelectionChange: PropTypes.func.isRequired,
  selectedCountries: PropTypes.arrayOf(
    PropTypes.shape({
      iso3: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  setPopulationData: PropTypes.func.isRequired,
};
