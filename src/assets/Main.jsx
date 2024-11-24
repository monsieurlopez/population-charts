import { useState } from 'react';
import PopulationChart from './Chart';
import CreateListCountries from './CreateListCountries.jsx';
import SelectedCountries from './SelectedCountries.jsx';

function CreateMain() {
    const [selectedCountries, setSelectedCountries] = useState(new Set());
    const [countryToChart, setCountryToChart] = useState(null);
    const [countryColors, setCountryColors] = useState({});
    const [generateChart, setGenerateChart] = useState(false);
    const [changeListOfCountries, setChangeListOfCountries] = useState(false);

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
        <main id='main' className='position-absulute row text-center' style={{ height: maxHeight }}>
            <div id="research" className="d-flex flex-column col-2 h-100">
                <CreateListCountries
                    selectedCountries={selectedCountries}
                    onCountrySelect={handleCountrySelect}
                />
            </div>
            <div className="col-8">
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
            <div id="selection" className="col-2 mt-2">
                <SelectedCountries 
                    selectedCountries={selectedCountries}
                    onRemoveCountry={handleRemoveCountry} 
                    onGenerateChart={handleCreateChart} 
                    changeListOfCountries={changeListOfCountries}
                />
            </div>
        </main>
    );
}

export default CreateMain;
