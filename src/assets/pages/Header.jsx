import PropTypes from 'prop-types';
import './Header.css';
import { CreateToggleButton } from '../tools/ToggleView.jsx';
import populationChartLogo from '../images/img-population-chart.png';

export const Header = ({ onToggleChange }) => {
  return (
    <header className='header'>
      <h1 className='header__title'>
        <img className='header__title-img' src={populationChartLogo} alt="Logo Population Chart" />
      </h1>
      <CreateToggleButton onToggleChange={onToggleChange} />
    </header>
  );
};

Header.propTypes = {
  onToggleChange: PropTypes.func.isRequired,
};