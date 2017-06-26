import React from 'react';
import PropTypes from 'prop-types';
import { WeatherPolyline } from './WeatherPolyline';
import { WeatherList } from './WeatherList';
import { Loading } from './Loading';


export class WeatherDataView extends React.Component {

    render() {
        const { weathers } = this.props;
        return weathers.length !== 0 ? this.renderData() : this.renderLoading();
    }

    renderData() {
        const { weathers, loadingClassName } = this.props;
        return (
            <div>
                <Loading 
                    loadingClassName={loadingClassName}
                />
                <WeatherPolyline
                    weathers={weathers}
                />
                <WeatherList
                    weathers={weathers}
                />
            </div>
        );

    }

    renderLoading() {
        return (
            <Loading />
        );
    }
}

WeatherDataView.propTypes = {
    weathers: PropTypes.arrayOf(PropTypes.object.isRequired)
}

