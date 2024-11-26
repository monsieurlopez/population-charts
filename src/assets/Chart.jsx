import { useState, useEffect, useRef } from 'react';
import { Spinner } from 'react-bootstrap';
import Chart from "chart.js/auto";
import { fetchPopulationData } from './Api';
import PropTypes from 'prop-types';
import CreateAlert from './Alerts';
import ConfigurationChart from './ConfigurationChart';

const PopulationChart = ({ selectedCountries, countryColors, generateChart, onChartCreated }) => {
  const [populationData, setPopulationData] = useState({});
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [animationConfig, setAnimationConfig] = useState(false);
  const chartRef = useRef(null);

  // Dividir países en grupos de un tamaño específico
  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  useEffect(() => {
    // Solo ejecutar si `generateChart` es true
    if (!generateChart || !selectedCountries || selectedCountries.size === 0) return;

    const fetchData = async () => {
      setLoading(true);
      setAlerts([]);

      const countryGroups = chunkArray(Array.from(selectedCountries), 5);

      const dataPromises = countryGroups.map(async (group) => {
        const groupData = await Promise.allSettled(group.map(async (country) => {
          const data = await fetchPopulationData(country);
          return { country, data };
        }));

        return groupData
          .filter(result => result.status === 'fulfilled')
          .map(result => result.value);
      });

      try {
        const groupResults = await Promise.all(dataPromises);

        const populationDataByCountry = groupResults.flat().reduce((acc, { country, data }) => {
          if (Array.isArray(data) && data.length > 0) {
            acc[country] = data;
          } else {
            setAlerts(prevAlerts => [...prevAlerts, { message: `We do not currently have population data for ${country}`, id: country }]);
          }
          return acc;
        }, {});

        setPopulationData(populationDataByCountry);
      } catch (error) {
        console.error('Error fetching population data:', error);
      } finally {
        setLoading(false);
        onChartCreated(); // Restablece `generateChart` después de crear el gráfico
      }
    };

    fetchData();
  }, [generateChart, selectedCountries, onChartCreated]);

  useEffect(() => {
    if (Object.keys(populationData).length === 0) return;

    const labels_graph = populationData[Object.keys(populationData)[0]]?.map(d => d.year) || [];
    const datasets_graph = Object.keys(populationData).map((country) => {
      const countryData = populationData[country].map(d => parseFloat(d.population));
      const colorSelected = countryColors[country] || `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`;
      const borderColorSelected = colorSelected.replace('0.2', '1'); 

      return {
        label: country,
        data: countryData,
        backgroundColor: colorSelected,
        borderColor: borderColorSelected,
        fill: false,
        tension: 0.1,
        radius: 2,
      };
    });

    const ctx = document.getElementById("population_chart").getContext("2d");

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels_graph,
        datasets: datasets_graph,
      },
      options: {
        responsive: true,
        animation: animationConfig,
        interaction: {
          intersect: false,
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
          },
        },
        scales: {
          x: {
            type: 'linear',
          },
        },
      },
    });

  }, [populationData, animationConfig, countryColors]);

  const handleAlertClose = (countryId) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== countryId));
  };

  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status" />
      ) : (
        Object.keys(populationData).length > 0 && (
          <div>
            <div className='container mt-4' style={{ height: 'auto' }}>
              <canvas id='population_chart' width="auto" height="auto"></canvas>
            </div>
          </div>
        )
      )}
      {loading ? "" : <ConfigurationChart chartRef={chartRef} onAnimationConfigChange={setAnimationConfig}/>}
      {alerts.map((alert) => (
        <CreateAlert
          key={alert.id}
          variant="danger"
          message={alert.message}
          timeout={5000}
          onClose={() => handleAlertClose(alert.id)}
        />
      ))}
    </>
  );
};

PopulationChart.propTypes = {
  selectedCountries: PropTypes.instanceOf(Set).isRequired,
  countryColors: PropTypes.object.isRequired,
  generateChart: PropTypes.bool.isRequired,
  onChartCreated: PropTypes.func.isRequired,
};

export default PopulationChart;
