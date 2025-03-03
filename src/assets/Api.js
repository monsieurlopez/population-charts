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
export const fetchPopulationData = async () => {
  try {
    const response = await axios.get(
      "https://countriesnow.space/api/v0.1/countries/population",
    );

    return response.data;
  } catch (error) {
    console.error(`Error fetching population data:`, error.message);
    return [];
  }
};
