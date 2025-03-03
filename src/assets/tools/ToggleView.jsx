import { useState } from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
//* SVG icons checkboxes radios *//
import TableIcon from '../images/svg/table-icon.svg';
import ChartIcon from '../images/svg/line-chart-icon.svg';
//* Style CSS *//
import './styles/ToggleView.css';

export const CreateToggleButton = ( {onToggleChange  }) => {
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Table', value: '1', icon: TableIcon },
    { name: 'Chart', value: '2', icon: ChartIcon },
  ];

  const handleToggleChange = (value) => {
    setRadioValue(value);
    onToggleChange(value);
  };

  return (
    <>
      <ButtonGroup className='toggle__container'>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? 'outline-primary' : 'outline-primary'}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => handleToggleChange(e.currentTarget.value)}
            className={radioValue === radio.value ? 'togglebutton--checked' : ''}
          >
            <img src={radio.icon} alt={`${radio.name} icon`} className='icon__radio' />
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </>
  );
}

CreateToggleButton.propTypes = {
  onToggleChange: PropTypes.func.isRequired,
};

