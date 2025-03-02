import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { fetchCountries, fetchPopulationData } from "../Api.js";
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

export const CreateTable = ({ onSelectionChange, selectedCountries }) => {
  const [countries, setCountries] = useState([]);
  const [filters, setFilters] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const prevSelected = useRef([]);

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      setCountries(data);
    };
    getCountries();
    initFilters();
  }, []);

  useEffect(() => {
    if (onSelectionChange) {
      if (
        JSON.stringify(prevSelected.current) !==
        JSON.stringify(selectedCountries)
      ) {
        console.log(selectedCountries);
        prevSelected.current = selectedCountries;
        onSelectionChange(selectedCountries);
        fetchPopulationData(selectedCountries);
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

  //const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  //const paginatorRight = <Button type="button" icon="pi pi-download" text />;

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center">
        <Stack direction="horizontal" gap={1}>
          <Button variant="outline-secondary" onClick={clearFilter} size="sm">
            Clear Filter
          </Button>
          <Button
            variant="outline-secondary"
            onClick={clearSelection}
            size="sm"
          >
            Clear Selection
          </Button>
        </Stack>

        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search"
          />
        </IconField>
      </div>
    );
  };

  return (
    <div className="container m-auto text-center">
      <h3>Country Information</h3>
      <DataTable
        value={countries}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        //paginatorLeft={paginatorLeft}
        //paginatorRight={paginatorRight}
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
        style={{ minWidth: "50rem" }}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column
          field="flag"
          header="Flag"
          body={flagTemplate}
          style={{ minWidth: "50px" }}
        />
        <Column
          field="name"
          header="Country"
          sortable
          style={{ minWidth: "150px" }}
        />
        <Column
          field="capital"
          header="Capital"
          sortable
          style={{ minWidth: "150px" }}
        />
        <Column
          field="iso3"
          header="ISO Code"
          sortable
          style={{ minWidth: "100px" }}
        />
        <Column
          field="currency"
          header="Currency"
          sortable
          style={{ minWidth: "150px" }}
        />
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
};
