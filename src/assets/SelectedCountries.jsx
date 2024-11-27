import { ListGroup, Button, CloseButton } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const SelectedCountries = ({ selectedCountries, onRemoveCountry, onGenerateChart }) => {
  const [countryColors, setCountryColors] = useState({}); // Guardar colores seleccionados localmente
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [buttonText, setButtonText] = useState("Generate chart");
  const [firstGeneration, setFirstGeneration] = useState(false);

  useEffect(() => {
    // Inicializar colores por defecto para cada país seleccionado, si aún no tiene uno
    setCountryColors(prevColors => {
      const updatedColors = { ...prevColors };
      Array.from(selectedCountries).forEach(country => {
        if (!updatedColors[country]) {
          updatedColors[country] = "#e66465";
        }
      });
      return updatedColors;
    });

    if (firstGeneration === false && selectedCountries.size === 0) {
      setButtonText("Generate chart");
      setIsButtonDisabled(true);
    } else if (firstGeneration === false && selectedCountries.size !== 0 ) {
      setIsButtonDisabled(false);
    }else {
      if (selectedCountries.size === 0) {
        setButtonText("Generate chart");
        setIsButtonDisabled(true);
      } else {
        setButtonText("Update chart");
        setIsButtonDisabled(false);
      }
    }

  }, [selectedCountries, firstGeneration]);

  // Función para manejar cambios de color solo a nivel local
  const handleColorChange = (country, newColor) => {
    setCountryColors(prevColors => ({
      ...prevColors,
      [country]: newColor
    }));
  };

  // Manejar la generación del gráfico y enviar colores al padre
  const handleGenerateChart = () => {
    onGenerateChart(countryColors);
    setFirstGeneration(true);
    setIsButtonDisabled(true);
  };

  return (
    <>
      <h4>Selected Countries</h4>
      {selectedCountries.size === 0 ? (
        <p>No countries selected</p>
      ) : (
        <ListGroup>
          {Array.from(selectedCountries).map((country, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
              {country}
              <div className="d-flex align-items-center">
                <input 
                  type="color"
                  value={countryColors[country] || "#e66465"} 
                  onChange={(e) => handleColorChange(country, e.target.value)}
                  style={{ width: '20px', height: '20px', marginRight: '5px' }}
                />
                <CloseButton onClick={() => onRemoveCountry(country)}></CloseButton>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      <Button
        id='create_chart'
        variant='primary mt-1'
        size='sm'
        onClick={handleGenerateChart}
        disabled={isButtonDisabled}
      >
      {buttonText}
      </Button>
    </>
  );
};

SelectedCountries.propTypes = {
  selectedCountries: PropTypes.instanceOf(Set).isRequired,
  onRemoveCountry: PropTypes.func.isRequired, 
  onGenerateChart: PropTypes.func.isRequired,
};

export default SelectedCountries;
