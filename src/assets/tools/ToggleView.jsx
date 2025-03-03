import { useState } from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

export const CreateToggleButton = ( {onToggleChange  }) => {
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Tabble', value: '1' },
    { name: 'Chart', value: '2' },
  ];

  const handleToggleChange = (value) => {
    setRadioValue(value);
    onToggleChange(value);
  };

  return (
    <>
      <ButtonGroup>
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
          >
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

