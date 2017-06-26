import React from 'react';
import PropTypes from 'prop-types';


export class WeatherItem extends React.Component {

    render() {
        const { weather } = this.props;
        const imgUrl = 'http://www.cwb.gov.tw/V7/symbol/weather/gif/day/' + weather.Wx + '.gif';
        return (
            <div className="list-item">
                <span className="date">{weather.wDate} </span>
                <img className="weather-pic" src={imgUrl} alt="pic" />
                {/* <span className="temperature">{weather.T} </span> */}
                <span className="pop">{weather.PoP.length !== 0 ? weather.PoP : '-'} </span>
                <span className="min-temperature">{weather.MinT} </span>
                <span className="max-temperature">{weather.MaxT} </span>
            </div>
        )
    }
}

WeatherItem.propTypes = {
    weather: PropTypes.arrayOf(PropTypes.object.isRequired)
}
