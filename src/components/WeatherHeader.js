import React from 'react';
import PropTypes from 'prop-types';
import { WeatherSelect } from './WeatherSelect';

export class WeatherHeader extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            title: "新北市",
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(e) {
        const { onSelect } = this.props;
        this.setState({ title: e });
        onSelect && onSelect(e);
    }


    render() {

        return (
            <div className="header">
                <div className="header-title">{this.state.title}</div>
                <WeatherSelect
                    title={this.state.title}
                    onSelect={this.handleSelect}
                />
            </div>
        )
    }
}

WeatherHeader.propTypes = {
    onSelect: PropTypes.func.isRequired
}

