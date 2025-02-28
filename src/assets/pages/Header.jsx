//import PropTypes from 'prop-types';
import './Header.css';
import { } from 'react-bootstrap';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faSearch, faList, faTimes } from '@fortawesome/free-solid-svg-icons';
import populationChartLopgo from '../images/img-population-chart.png';

function Header() {
    return (
        <header className='header'>
            <h1 className='header__title'>
                <img className='header__title-img' src={populationChartLopgo} alt="Logo Population Chart"/>
            </h1>
        </header>
    );
}

Header.propTypes = {};

export default Header;
