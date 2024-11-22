import axios from 'axios';

// Llamada a la API para obtener la lista de países
export const fetchCountries = async () => {
    try {
        const response = await axios.get('https://countriesnow.space/api/v0.1/countries');
        if (response.data && response.data.data) {
            const countryNames = response.data.data.map(country => country.country);
            return countryNames;  // Retorna la lista de nombres de países
        } else {
            console.error('No data found');
            return [];  // Si no hay datos, retornar un array vacío
        }
    } catch (error) {
        console.error('Error fetching countries:', error);  // Manejo de errores
        return [];
    }
};

// Llamada a la API para obtener los datos de población de un país
export const fetchPopulationData = async (selectedCountry) => {
    try {
      const response = await axios.post('https://countriesnow.space/api/v0.1/countries/population', {
        country: selectedCountry
      });
  
      // Verificar si la respuesta es exitosa (estado HTTP 200)
      if (response.status === 200) {
        const data = response.data;
  
        // Verificar que no haya errores en la respuesta y que existan los datos
        if (data.error === false && data.data && data.data.populationCounts) {
          return data.data.populationCounts.map((entry) => ({
            year: entry.year,
            population: entry.value
          }));
        } else {
          console.error(`No data found for the selected country: ${selectedCountry}`);
          return [];
        }
      } else {
        console.error(`Unexpected status code: ${response.status} for country: ${selectedCountry}`);
        return [];
      }
    } catch (error) {
      // Registrar un error más detallado
      console.error(`Error fetching population data for ${selectedCountry}:`, error.message);
      return [];
    }
};
