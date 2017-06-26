import React from 'react';
import PropTypes from 'prop-types';

export class Loading extends React.Component {

    render() {
        const { loadingClassName } = this.props;

        const clasName = loadingClassName === "hidden" ? "loading loading-hidden" : "loading"

        return (
            <div className={clasName}>
                <img src="./assets/loading.gif" alt="loading"/>
            </div>
        );
    }

}

Loading.propTypes = {
    loadingClassName: PropTypes.string
}

