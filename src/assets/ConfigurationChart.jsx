import { ButtonGroup, ToggleButton, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';

const ConfigurationChart = ({chartRef, onAnimationConfigChange}) => {

    const [radioValue, setRadioValue] = useState('1');
    const [animationsEnabled, setAnimationsEnabled] = useState(false);

    const radios = [
        { name: 'Point', value: '1' },
        { name: 'Index', value: '2' },
    ];

    const animationOptions = useMemo(() => {
        if (!animationsEnabled) return false;
        const totalDuration = 15000;
        const delayBetweenPoints = totalDuration / 100;

        const previousY = (ctx) =>
            ctx.index === 0
                ? ctx.chart.scales.y.getPixelForValue(100)
                : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;

        return {
            x: {
                type: 'number',
                easing: 'linear',
                duration: delayBetweenPoints,
                from: NaN,
                delay(ctx) {
                    if (ctx.type !== 'data' || ctx.xStarted) return 0;
                    ctx.xStarted = true;
                    return ctx.index * delayBetweenPoints;
                }
            },
            y: {
                type: 'number',
                easing: 'linear',
                duration: delayBetweenPoints,
                from: previousY,
                delay(ctx) {
                    if (ctx.type !== 'data' || ctx.yStarted) return 0;
                    ctx.yStarted = true;
                    return ctx.index * delayBetweenPoints;
                }
            }
        };
    }, [animationsEnabled]);

    const updateInteractionMode = (mode) => {
        if (chartRef.current) {
            const chart = chartRef.current;
            if (mode === '1') {
                chart.options.interaction.axis = 'xy';
                chart.options.interaction.mode = 'point';
                chart.options.plugins.tooltip.position = 'nearest';
            } else {
                chart.options.interaction.axis = 'xy';
                chart.options.interaction.mode = 'index';
                chart.options.plugins.tooltip.position = 'average';
            }
            chart.update();
        }
    };

    const handleRadioChange = (value) => {
        setRadioValue(value);
        updateInteractionMode(value);
    };

    const handleToggleAnimation = (e) => {
        setAnimationsEnabled(e.target.checked);
        onAnimationConfigChange(e.target.checked ? animationOptions : false); 
    };

    return (
       <>
       <Form className='d-flex justify-content-between align-items-center'>
            <Form.Check 
                type="switch"
                id="custom-switch"
                label="Animations"
                onChange={handleToggleAnimation}
                checked={animationsEnabled}
            />
            <Button onClick={() => chartRef.current?.update()} size="sm"> Update chart </Button>
            <ButtonGroup>
            {radios.map((radio, idx) => (
            <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? 'outline-primary' : 'outline-primary'}
                name="radio"
                size='sm'
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => handleRadioChange(e.currentTarget.value)}
            >
                {radio.name}
            </ToggleButton>
            ))}
            </ButtonGroup>
        </Form>
       </> 
    )

}

ConfigurationChart.propTypes = {
    chartRef: PropTypes.shape({
      current: PropTypes.object
    }).isRequired,
    onAnimationConfigChange: PropTypes.func.isRequired
};

export default ConfigurationChart;