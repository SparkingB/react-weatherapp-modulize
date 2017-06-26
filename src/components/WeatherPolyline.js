import React from 'react';
import PropTypes from 'prop-types';
import { SVGcircle } from './SVGcircle'


export class WeatherPolyline extends React.Component {

    render() {

        const { weathers } = this.props;

        const position = [{ x: 50 }, { x: 100 }, { x: 150 }, { x: 200 }, { x: 250 }, { x: 300 }, { x: 350 }];

        const temperature = weathers.map((w, idx) => { position[idx].t = Number(w.T); position[idx].date = w.wDate; return position[idx].t });
        const temperatureMin = Math.min(...temperature);
        const temperatureDis = Math.max(...temperature) - temperatureMin;
        const mulFix = temperatureDis !== 0 ? 130.0 / temperatureDis : 1 ;
        position.map((pos) => (pos.cy = (pos.t - temperatureMin) * mulFix + 35));

        const polylinePoint = position.reduce((first, second) => (first + ' ' + second.x + ',' + -second.cy), '');


        const circle = position.map(
            (pos) => (
                <SVGcircle
                    key={pos.x}
                    textX={pos.x - 10}
                    textY={pos.cy + 10}
                    circleX={pos.x}
                    circleY={pos.cy}
                    date={pos.date}
                    temperature={pos.t}
                />
            )
        );

        return (
            <svg viewBox="0 -200 400 200" >
                {circle}
                < polyline points={polylinePoint} ></polyline >
            </svg >
        );
    }

}

WeatherPolyline.propTypes = {
    weathers: PropTypes.arrayOf(PropTypes.object.isRequired)
}
