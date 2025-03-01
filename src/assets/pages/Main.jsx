import { useState, useEffect } from "react";
import "./Main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchCountries } from "../Api.js";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { ButtonGroup } from "react-bootstrap";

function Main() {
  const [countries, setCountries] = useState([]); // Estado para guardar los países
  const [selectedCountries, setSelectedCountries] = useState([]); // Estado para selección de filas
  const [filters, setFilters] = useState(null); // Estado de los filtros
  const [globalFilterValue, setGlobalFilterValue] = useState(""); // Estado del filtro global

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      setCountries(data);
    };
    getCountries();
    initFilters();
  }, []);

  useEffect(() => {
    // Imprime la lista de países seleccionados
    console.log(selectedCountries);
  }, [selectedCountries]);

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
    setSelectedCountries([]); // Deselecciona todas las filas
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      global: { value, matchMode: FilterMatchMode.CONTAINS },
    }));
    setGlobalFilterValue(value);
  };

  // Función para renderizar la bandera
  const flagTemplate = (rowData) => {
    return (
      <img
        src={rowData.flag}
        alt={rowData.name}
        style={{ width: 40, height: 20 }}
      />
    );
  };

  // Botones de paginación personalizados
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;

  // Header con el filtro de búsqueda
  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <ButtonGroup>
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear Filter"
            outlined
            size="small"
            onClick={clearFilter}
          />
          <Button
            type="button"
            icon="pi pi-times"
            label="Clear Selection"
            outlined
            size="small"
            onClick={clearSelection}
          />
        </ButtonGroup>

        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Search..."
        />
      </div>
    );
  };

  return (
    <main className="main">
      <div className="container mt-4">
        <h3>Country Information</h3>
        <DataTable
          value={countries}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          paginatorLeft={paginatorLeft}
          paginatorRight={paginatorRight}
          selectionMode="checkbox"
          selection={selectedCountries}
          onSelectionChange={(e) => setSelectedCountries(e.value)}
          dataKey="iso3"
          filters={filters}
          globalFilterFields={["name", "capital", "iso3", "currency"]}
          header={renderHeader()}
          emptyMessage="No countries found."
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
    </main>
  );
}

export default Main;
