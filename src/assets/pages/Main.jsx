import { useState, useEffect } from "react";
import "./Main.css";
import { fetchCountries } from "../Api.js";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";  // Importar DataTable

function Main() {
  const [countries, setCountries] = useState([]); // Estado para guardar los países

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      console.log(data);
      setCountries(data); // Guarda los datos en el estado
    };
    getCountries();
  }, []); // [] asegura que se ejecuta solo una vez al montar

  // Definir las columnas de la tabla
  const columns = [
    {
      name: 'Flag',
      selector: row => row.flag,
      sortable: false,
      cell: row => <img src={row.flag} alt={row.name} className="img-fluid" style={{ width: 40 }} />,
    },
    {
      name: 'Country',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Capital',
      selector: row => row.capital,
      sortable: true,
    },
    {
      name: 'ISO Code',
      selector: row => row.iso3,
      sortable: true,
    },
    {
      name: 'Currency',
      selector: row => row.currency,
      sortable: true,
    },
  ];

  return (
    <main className="main">
      <div className="container mt-4">
        <DataTable
          title="Country Information"
          columns={columns}
          data={countries}
          pagination
          highlightOnHover
        />
      </div>
    </main>
  );
}

export default Main;
