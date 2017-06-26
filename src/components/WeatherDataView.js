import React from 'react';
import PropTypes from 'prop-types';
import { WeatherPolyline } from './WeatherPolyline';
import { WeatherList } from './WeatherList';
import { Loading } from './Loading';
import { ErrorPage } from './ErrorPage';


export class WeatherDataView extends React.Component {

    render() {
        const { weathers } = this.props;
        if (weathers === "error") return this.renderError();
        else return weathers.length !== 0 ? this.renderData() : this.renderLoading();
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

    renderError() {
        return (
            <ErrorPage />
        );
    }
}

WeatherDataView.propTypes = {
    weathers: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object.isRequired), PropTypes.string.isRequired])
}

