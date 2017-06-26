import React from 'react';
import PropTypes from 'prop-types';

export class SVGcircle extends React.Component {

    render() {
        const { textX, textY, circleX, circleY, temperature, date } = this.props;
        return (
            <g>
                <text x={textX} y={-textY} >{temperature}°C</text>
                <circle cx={circleX} cy={-circleY} r="3"></circle>
                <text x={textX - 5} y="-10" className="svgDate">{date}</text>
            </g>
        );
    }

}

SVGcircle.propTypes = {
    textX: PropTypes.number.isRequired,
    textY: PropTypes.number.isRequired,
    circleX: PropTypes.number.isRequired,
    circleY: PropTypes.number.isRequired,
    temperature: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired
}

