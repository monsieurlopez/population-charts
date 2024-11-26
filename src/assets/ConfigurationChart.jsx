import { ToggleButton, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMaximize, faDownload  } from "@fortawesome/free-solid-svg-icons";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { jsPDF } from 'jspdf';

const ConfigurationChart = ({ chartRef }) => {
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'Point', value: '1' },
        { name: 'Index', value: '2' },
    ];

    const updateInteractionMode = (mode) => {
        if (chartRef.current) {
            const chart = chartRef.current;
            if (mode === '1') {
                chart.options.interaction.axis = 'xy';
                chart.options.interaction.mode = 'point';
                chart.options.plugins.tooltip.position = 'nearest';
            } else {
                chart.options.interaction.axis = 'xy';
                chart.options.interaction.mode = 'index';
                chart.options.plugins.tooltip.position = 'average';
            }
            chart.update();
        }
    };

    const handleRadioChange = (value) => {
        setRadioValue(value);
        updateInteractionMode(value);
    };

    const handleFullScreen = () => {
        const chartElement = document.getElementById('population_chart');
        if (chartElement) {
            if (chartElement.requestFullscreen) {
                chartElement.requestFullscreen().then(() => {
                    if (chartRef.current) {
                        const chart = chartRef.current;
                        chart.options.plugins.tooltip.enabled = false; 
                        chart.update();
                    }
                    chartElement.style.backgroundColor = 'white';
                    chartElement.style.opacity = '1';
                });
            } else if (chartElement.mozRequestFullScreen) {
                chartElement.mozRequestFullScreen();
            } else if (chartElement.webkitRequestFullscreen) {
                chartElement.webkitRequestFullscreen();
            } else if (chartElement.msRequestFullscreen) {
                chartElement.msRequestFullscreen();
            }
        }
    };

    const downloadChartAsPNG = () => {
        if (chartRef.current) {
            const chart = chartRef.current;
            const link = document.createElement('a');
            link.href = chart.toBase64Image(); // Convierte el gráfico a Base64
            link.download = 'chart.png'; // Nombre del archivo
            link.click();
        }
    };

    const downloadChartAsJPEG = () => {
        if (chartRef.current) {
            const chart = chartRef.current;
            const link = document.createElement('a');
            // Convierte el gráfico a imagen JPEG en lugar de PNG
            link.href = chart.toBase64Image('image/jpeg'); 
            link.download = 'chart.jpeg'; // Nombre del archivo
            link.click();
        }
    };

    const downloadChartAsPDF = () => {
        if (chartRef.current) {
            const chart = chartRef.current;
            const chartImage = chart.toBase64Image(); // Convierte el gráfico a imagen Base64

            const pdf = new jsPDF('landscape');
            pdf.addImage(chartImage, 'PNG', 10, 10, 280, 150); // Añade la imagen al PDF
            pdf.save('chart.pdf'); // Guarda el archivo PDF
        }
    };

    return (
        <>
            <div className='d-flex justify-content-between align-items-center mt-3'>
                <FontAwesomeIcon
                    type='button'
                    size='lg'
                    icon={faMaximize}
                    style={{color: '#0a53be'}}
                    onClick={handleFullScreen}
                />
                <ButtonGroup>
                    {radios.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant={idx % 2 ? 'outline-primary' : 'outline-primary'}
                            name="radio"
                            size='sm'
                            value={radio.value}
                            checked={radioValue === radio.value}
                            onChange={(e) => handleRadioChange(e.currentTarget.value)}
                        >
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>

                <DropdownButton
                    id="dropdown-item-button"
                    title={<FontAwesomeIcon icon={faDownload}/>}
                    size='sm'
                    className="center-dropdown-items"
                >
                    <Dropdown.Item as="button" onClick={downloadChartAsPNG}> PNG </Dropdown.Item>
                    <Dropdown.Item as="button" onClick={downloadChartAsJPEG}> JPEG </Dropdown.Item>
                    <Dropdown.Item as="button" onClick={downloadChartAsPDF}> PDF </Dropdown.Item>
                </DropdownButton>
            </div>
        </>
    );
};

ConfigurationChart.propTypes = {
    chartRef: PropTypes.shape({
        current: PropTypes.object
    }).isRequired,
    onAnimationConfigChange: PropTypes.func.isRequired
};

export default ConfigurationChart;
