import React from 'react';
import { connect } from 'react-redux';
import { WeatherActions } from '../actions/WeatherActions';
import { WeatherHeader } from './WeatherHeader';
import { WeatherDataView } from './WeatherDataView';


class WeatherApp extends React.Component {

    componentWillMount() {
        console.log('componentWillMount');
        this.props.loadWeather();
    }

    render() {
        const {
            weathers,
            loadingClassName,
            loadWeather
         } = this.props;

        return (
            <div className="container">
                <WeatherHeader
                    onSelect={loadWeather}
                />
                <WeatherDataView
                    weathers={weathers}
                    loadingClassName={loadingClassName}
                />
            </div>
        )
    }
}

export default connect(
    (state) => ({ weathers: state.weathers.weathers, loadingClassName: state.loading }),
    {
        loadWeather: WeatherActions.loadWeather,
    }
)(WeatherApp);
