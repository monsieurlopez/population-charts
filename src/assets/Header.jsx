import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Header({ onToggleLeftPanel, onToggleRightPanel, showLeftPanel, showRightPanel }) {
    return (
        <header id="header" className="position-fixed top-0 w-100 bg-secondary-subtle d-flex align-items-center justify-content-between px-3" style={{ height: '60px' }}>
            <Button
                variant="link"
                className="button-offCanvas text-secondary p-0"
                onClick={onToggleLeftPanel}
                style={{ fontSize: '1.5rem' }}
            >
                <FontAwesomeIcon icon={showLeftPanel ? faTimes : faSearch} />
            </Button>

            <div className="text-center d-flex align-items-center justify-content-center flex-grow-1">
                <p className="text-secondary fs-2 me-4 mb-0">
                    <strong>Population Charts</strong>
                </p>
                <img src="/logo_chartjs.svg" alt="Logo de ChartJS" className="img-fluid" style={{ width: '50px', height: 'auto' }} />
            </div>

            <Button
                variant="link"
                className="button-offCanvas text-secondary p-0"
                onClick={onToggleRightPanel}
                style={{ fontSize: '1.5rem' }}
            >
                <FontAwesomeIcon icon={showRightPanel ? faTimes : faBars} />
            </Button>
        </header>
    );
}

Header.propTypes = {
    onToggleLeftPanel: PropTypes.func.isRequired,
    onToggleRightPanel: PropTypes.func.isRequired,
    showLeftPanel: PropTypes.bool.isRequired,
    showRightPanel: PropTypes.bool.isRequired,
};

export default Header;
