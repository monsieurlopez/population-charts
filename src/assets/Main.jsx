import { useState, useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import PopulationChart from './Chart';
import CreateListCountries from './CreateListCountries.jsx';
import SelectedCountries from './SelectedCountries.jsx';
import CreateInstructuions from './tools/Instructions.jsx';
import RotateDevice from './tools/RotateDevice.jsx';
import PropTypes from 'prop-types';

function Main({ showLeftPanel, showRightPanel, onToggleLeftPanel, onToggleRightPanel }) {
    const [selectedCountries, setSelectedCountries] = useState(new Set());
    const [countryToChart, setCountryToChart] = useState(null);
    const [countryColors, setCountryColors] = useState({});
    const [generateChart, setGenerateChart] = useState(false);
    const [isWideScreen] = useState(window.innerWidth >= 1400);
    const [isLandscape, setIsLandscape] = useState(window.matchMedia('(orientation: landscape)').matches);
    const [mainHeight, setMainHeight] = useState(window.innerHeight - 60);
    const [chartWidth, setChartWidth] = useState(window.innerWidth);

    // Calcular el ancho en función de la relación de aspecto (solo en modo horizontal)
    const aspectRatio = 16 / 9; // Ancho:alto 16:9

    useEffect(() => {
        const updateHeight = () => {
            setMainHeight(window.innerHeight - 60); // Ajusta la altura del contenedor
        };

        // Ajustar altura al cargar la página y al cambiar el tamaño o la orientación
        updateHeight();
        window.addEventListener('resize', updateHeight);

        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(orientation: landscape)');
        const handleOrientationChange = (event) => {
            setIsLandscape(event.matches);
        };

        // Escuchar cambios en la orientación
        mediaQuery.addEventListener('change', handleOrientationChange);

        // Limpieza del listener
        return () => {
            mediaQuery.removeEventListener('change', handleOrientationChange);
        };
    }, []);

    useEffect(() => {
        const updateDimensions = () => {
            // Actualiza las dimensiones según la orientación
            if (isLandscape) {
                const newWidth = mainHeight * aspectRatio; // Calcular el ancho proporcional basado en el alto
                setChartWidth(newWidth);
            } else {
                setChartWidth(window.innerWidth); // Usar el ancho completo en vertical
            }
        };

        updateDimensions();
    }, [mainHeight, isLandscape, aspectRatio]);

    const handleCountrySelect = (updatedSet) => {
        setSelectedCountries(updatedSet);
    };

    const handleRemoveCountry = (country) => {
        setSelectedCountries((prev) => {
            const updatedSet = new Set(prev);
            updatedSet.delete(country);
            return updatedSet;
        });
    };

    const handleCreateChart = (colors) => {
        if (selectedCountries.size > 0) {
            setCountryToChart(new Set(selectedCountries)); // Guarda los países seleccionados
            setCountryColors(colors); // Guarda los colores
            setGenerateChart(true); // Indica que la gráfica debe generarse
        }
    };

    return (
        <main
            id="main"
            className="container-fluid row text-center"
            style={{ height: `${mainHeight}px`, width: '100%' }}
        >
            {/* Sidebar de selección */}
            {isWideScreen ? (
                <div id="research" className="d-flex flex-column col-2 h-100">
                    <CreateListCountries
                        selectedCountries={selectedCountries}
                        onCountrySelect={handleCountrySelect}
                    />
                </div>
            ) : (
                <Offcanvas show={showLeftPanel} onHide={onToggleLeftPanel} placement="start">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Countries</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <CreateListCountries
                            selectedCountries={selectedCountries}
                            onCountrySelect={handleCountrySelect}
                        />
                    </Offcanvas.Body>
                </Offcanvas>
            )}

            {/* Contenido principal */}
            <div className={`h-100 ${isWideScreen ? 'col-8' : 'w-100'}`} style={{ minHeight: '100vh', overflow: 'hidden' }}>
                {countryToChart ? (
                    <>
                        {/* Gráfica */}
                        <div
                            style={{
                                display: isLandscape ? 'block' : 'none',
                                width: isWideScreen ?  '' : `${chartWidth}px`,
                                height: '100%',
                                margin: '0 auto',
                            }}
                        >
                            <PopulationChart
                                selectedCountries={countryToChart}
                                countryColors={countryColors}
                                generateChart={generateChart}
                                onChartCreated={() => setGenerateChart(false)}
                            />
                        </div>

                        {/* Mensaje de rotación */}
                        <div
                            style={{
                                display: isLandscape ? 'none' : 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                width: '100%',
                            }}
                        >
                            <RotateDevice />
                        </div>
                    </>
                ) : (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                        <CreateInstructuions />
                    </div>
                )}
            </div>

            {/* Sidebar de países seleccionados */}
            {isWideScreen ? (
                <div id="selection" className="col-2 mt-2 flex-column">
                    <SelectedCountries
                        selectedCountries={selectedCountries}
                        onRemoveCountry={handleRemoveCountry}
                        onGenerateChart={handleCreateChart}
                    />
                </div>
            ) : (
                <Offcanvas show={showRightPanel} onHide={onToggleRightPanel} placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Selected Countries</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <SelectedCountries
                            selectedCountries={selectedCountries}
                            onRemoveCountry={handleRemoveCountry}
                            onGenerateChart={handleCreateChart}
                            changeListOfCountries={generateChart}
                        />
                    </Offcanvas.Body>
                </Offcanvas>
            )}
        </main>
    );
}

Main.propTypes = {
    onToggleLeftPanel: PropTypes.func.isRequired,
    onToggleRightPanel: PropTypes.func.isRequired,
    showLeftPanel: PropTypes.bool.isRequired,
    showRightPanel: PropTypes.bool.isRequired,
};

export default Main;
