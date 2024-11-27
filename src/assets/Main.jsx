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
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1400);
    const [isLandscape, setIsLandscape] = useState(window.matchMedia('(orientation: landscape)').matches);

    // Detectar cambios de orientación
    useEffect(() => {
        const handleOrientationChange = () => {
            setIsLandscape(window.matchMedia('(orientation: landscape)').matches);
        };

        // Escuchar cambios de orientación
        window.addEventListener('orientationchange', handleOrientationChange);

        // Inicializar el estado al cargar
        handleOrientationChange();

        return () => {
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    }, []);

    // Detectar cambios en el tamaño de la pantalla
    useEffect(() => {
        const handleResize = () => setIsWideScreen(window.innerWidth >= 1400);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
            setCountryToChart(new Set(selectedCountries));
            setCountryColors(colors);
            setGenerateChart(true);
        }
    };

    return (
        <main
            id="main"
            className="container-fluid row text-center"
            style={{ height: 'calc(100vh - 60px)', width: '100%' }}
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
                    isLandscape ? (
                        <PopulationChart
                            selectedCountries={countryToChart}
                            countryColors={countryColors}
                            generateChart={generateChart}
                            onChartCreated={() => setGenerateChart(false)}
                        />
                    ) : (
                        <RotateDevice />
                    )
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
