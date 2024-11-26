import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Header({ onToggleLeftPanel, onToggleRightPanel, showLeftPanel, showRightPanel }) {
    return (
        <header id="header" className="position-fixed top-0 w-100 bg-secondary-subtle d-flex align-items-center justify-content-between px-3" style={{ height: '60px' }}>
            {/* Botón de la lupa (izquierda) */}
            <Button
                variant="link"
                className="text-secondary p-0"
                onClick={onToggleLeftPanel}
                style={{ fontSize: '1.5rem' }}
            >
                <FontAwesomeIcon icon={showLeftPanel ? faTimes : faSearch} />
            </Button>

            {/* Título y logo */}
            <div className="text-center d-flex align-items-center justify-content-center flex-grow-1">
                <p className="text-secondary fs-2 me-4 mb-0">
                    <strong>Population Charts</strong>
                </p>
                <img src="/logo_chartjs.svg" alt="Logo de ChartJS" className="img-fluid" style={{ width: '50px', height: 'auto' }} />
            </div>

            {/* Botón de la hamburguesa (derecha) */}
            <Button
                variant="link"
                className="text-secondary p-0"
                onClick={onToggleRightPanel}
                style={{ fontSize: '1.5rem' }}
            >
                <FontAwesomeIcon icon={showRightPanel ? faTimes : faBars} />
            </Button>
        </header>
    );
}

export default Header;
