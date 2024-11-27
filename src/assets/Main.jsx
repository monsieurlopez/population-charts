import { useState, useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import PopulationChart from './Chart';
import CreateListCountries from './CreateListCountries.jsx';
import SelectedCountries from './SelectedCountries.jsx';
import CreateInstructuions from './tools/Instructions.jsx';
import PropTypes from 'prop-types';

function Main({ showLeftPanel, showRightPanel, onToggleLeftPanel, onToggleRightPanel }) {
    const [selectedCountries, setSelectedCountries] = useState(new Set());
    const [countryToChart, setCountryToChart] = useState(null);
    const [countryColors, setCountryColors] = useState({});
    const [generateChart, setGenerateChart] = useState(false);
    const [changeListOfCountries, setChangeListOfCountries] = useState(false);
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1400);

    useEffect(() => {
        const handleResize = () => setIsWideScreen(window.innerWidth >= 1400);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    //const maxHeight = window.innerHeight - 60;

    const handleCountrySelect = (updatedSet) => {
        setSelectedCountries(updatedSet);
        setChangeListOfCountries(true);
    };

    const handleRemoveCountry = (country) => {
        setSelectedCountries((prev) => {
            const updatedSet = new Set(prev);
            updatedSet.delete(country);
            return updatedSet;
        });
        setChangeListOfCountries(true);
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
            style={{ height: '94vh', top: '60px', width: '100%' }}
        >
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

            <div className={`h-100 ${isWideScreen ? 'col-8' : 'w-100'}`} style={{ minHeight: '100vh', overflow: 'hidden' }}>
                {countryToChart ? (
                    <PopulationChart
                        selectedCountries={countryToChart}
                        countryColors={countryColors}
                        generateChart={generateChart}
                        onChartCreated={() => setGenerateChart(false)}
                    />
                ) : (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                        <CreateInstructuions />
                    </div>
                )}
            </div>

            {isWideScreen ? (
                <div id="selection" className="col-2 mt-2 flex-column">
                    <SelectedCountries
                        selectedCountries={selectedCountries}
                        onRemoveCountry={handleRemoveCountry}
                        onGenerateChart={handleCreateChart}
                        changeListOfCountries={changeListOfCountries}
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
                            changeListOfCountries={changeListOfCountries}
                        />
                    </Offcanvas.Body>
                </Offcanvas>
            )}
        </main>
    );
}

Main.propTypes = {
    onToggleLeftPanel: PropTypes.func.isRequired, // Función requerida
    onToggleRightPanel: PropTypes.func.isRequired, // Función requerida
    showLeftPanel: PropTypes.bool.isRequired, // Booleano requerido
    showRightPanel: PropTypes.bool.isRequired, // Booleano requerido
};

export default Main;