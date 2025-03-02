import axios from "axios";

// Llamada a la API para obtener la lista de países
export const fetchCountries = async () => {
  try {
    const response = await axios.get(
      "https://countriesnow.space/api/v0.1/countries/info?returns=currency,flag,capital,iso3"
    );
    if (response.data && response.data.data) {
      console.log("LLamda API");
      return response.data.data; // Retorna la lista de nombres de países
    } else {
      console.error("No data found");
      return []; // Si no hay datos, retornar un array vacío
    }
  } catch (error) {
    console.error("Error fetching countries:", error); // Manejo de errores
    return [];
  }
};

// Llamada a la API para obtener los datos de población de un país
export const fetchPopulationData = async (selectedCountry) => {
  try {
    // Asegúrate de que selectedCountry sea un array y que tenga al menos un elemento
    if (!Array.isArray(selectedCountry) || selectedCountry.length === 0) {
      throw new Error("Invalid selectedCountry data");
    }

    // Crea un objeto JSON con el código ISO3 del país seleccionado
    const data = {
      iso3: selectedCountry.map(country => country.iso3)
    }
    console.log(data);

    const response = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/population",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data); // La respuesta de la API
    return response.data;
  } catch (error) {
    console.error(`Error fetching population data:`, error.message);
    return [];
  }
};
