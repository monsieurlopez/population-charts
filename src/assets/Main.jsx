import { useState, useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import Header from './Header';
import PopulationChart from './Chart';
import CreateListCountries from './CreateListCountries.jsx';
import SelectedCountries from './SelectedCountries.jsx';

function Main() {
    const [selectedCountries, setSelectedCountries] = useState(new Set());
    const [countryToChart, setCountryToChart] = useState(null);
    const [countryColors, setCountryColors] = useState({});
    const [generateChart, setGenerateChart] = useState(false);
    const [changeListOfCountries, setChangeListOfCountries] = useState(false);

    const [showLeftPanel, setShowLeftPanel] = useState(false);
    const [showRightPanel, setShowRightPanel] = useState(false);
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1400);

    // Detecta cambios de tamaño de pantalla
    useEffect(() => {
        const handleResize = () => setIsWideScreen(window.innerWidth >= 1400);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxHeight = window.innerHeight - 60;

    const handleCountrySelect = (updatedSet) => {
        setSelectedCountries(updatedSet);
        setChangeListOfCountries(true);
    };

    const handleRemoveCountry = (country) => {
        setSelectedCountries(prev => {
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
        <>
            {/* Header */}
            <Header
                onToggleLeftPanel={() => setShowLeftPanel(!showLeftPanel)}
                onToggleRightPanel={() => setShowRightPanel(!showRightPanel)}
                showLeftPanel={showLeftPanel}
                showRightPanel={showRightPanel}
            />

            <main id="main" className="position-absolute row text-center" style={{ height: maxHeight, top: '60px', width: '100%' }}>
                {/* Columna izquierda u Offcanvas */}
                {isWideScreen ? (
                    <div id="research" className="d-flex flex-column col-2 h-100">
                        <CreateListCountries
                            selectedCountries={selectedCountries}
                            onCountrySelect={handleCountrySelect}
                        />
                    </div>
                ) : (
                    <Offcanvas show={showLeftPanel} onHide={() => setShowLeftPanel(false)} placement="start">
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

                {/* Columna central */}
                <div className={`h-100 ${isWideScreen ? 'col-8' : 'col-12'}`}>
                    {countryToChart ? (
                        <PopulationChart
                            selectedCountries={countryToChart}
                            countryColors={countryColors}
                            generateChart={generateChart}
                            onChartCreated={() => setGenerateChart(false)}
                        />
                    ) : (
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "600px" }}>
                            <h3>No chart available</h3>
                        </div>
                    )}
                </div>

                {/* Columna derecha u Offcanvas */}
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
                    <Offcanvas show={showRightPanel} onHide={() => setShowRightPanel(false)} placement="end">
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
        </>
    );
}

export default Main;
