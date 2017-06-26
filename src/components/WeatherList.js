import React from 'react';
import PropTypes from 'prop-types';
import { WeatherItem } from './WeatherItem';

export class WeatherList extends React.Component {
    render() {
        const { weathers } = this.props;

        const WeatherItems = weathers.map(
            (weather) => (
                <WeatherItem
                    key={weather.wDate}
                    weather={weather}
                />
            )
        );



        return (<div className="list">{WeatherItems}</div>)
    }
}

WeatherItem.propTypes = {
    weathers: PropTypes.arrayOf(PropTypes.object.isRequired)
}
