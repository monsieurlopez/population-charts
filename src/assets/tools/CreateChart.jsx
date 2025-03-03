import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Chart } from "chart.js/auto";
//import { Line } from 'react-chartjs-2';

// Función para generar colores aleatorios
const generateRandomColor = (existingColors) => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  // Verifica si el color ya existe en la lista de colores existentes
  if (existingColors.includes(color)) {
    // Si el color ya existe, genera un nuevo color
    return generateRandomColor(existingColors);
  }

  // Si el color no existe, devuélvelo
  return color;
};

export const CreateChart = ({ selectedCountries, populationData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    // Preparar los datos para la gráfica
    const existingColors = [];
    const datasets = selectedCountries.map((country) => {
      const population = populationData.data.find(
        (pop) => pop.iso3 === country.iso3
      );
      const color = generateRandomColor(existingColors);
      existingColors.push(color);

      return {
        label: country.name,
        data: population
          ? population.populationCounts.map((count) => count.value)
          : [],
        borderColor: color,
        fill: false,
        tension: 0.1,
        radius: 2,
      };
    });

    const data = {
      labels:
        populationData.data[0]?.populationCounts.map((count) => count.year) ||
        [],
      datasets: datasets,
    };

    const options = {
      responsive: true,
      interaction: {
        axis: "xy",
        mode: "index",
      },
      scales: {
        x: {
          type: "linear",
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
      },
    };

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: data,
      options: options,
    });

     // Agregar el listener para el evento resize
     const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, [selectedCountries, populationData]);

  return <canvas ref={chartRef} />;
};

CreateChart.propTypes = {
  selectedCountries: PropTypes.arrayOf(
    PropTypes.shape({
      iso3: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  populationData: PropTypes.object.isRequired,
};
