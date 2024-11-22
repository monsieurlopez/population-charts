import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function CreateAlert({ variant = "info", message = "", timeout = 10000, onClose }) {
    const [show, setShow] = useState(true);

    // Usamos useEffect para gestionar el tiempo que la alerta estará visible
    useEffect(() => {
        if (timeout) {
            const timer = setTimeout(() => {
                setShow(false); // Ocultar la alerta
                onClose(); // Llamar a la función onClose para eliminarla
            }, timeout); 
            return () => clearTimeout(timer); 
        }
    }, [timeout, onClose]);

    return show ? (
      <Alert variant={variant} onClose={() => setShow(false)} dismissible>
        {message}
      </Alert>
    ) : null; 
}

CreateAlert.propTypes = {
    variant: PropTypes.string.isRequired, 
    message: PropTypes.string.isRequired, 
    timeout: PropTypes.number, 
    onClose: PropTypes.func.isRequired, // Nueva prop para manejar el cierre
};

export default CreateAlert;
