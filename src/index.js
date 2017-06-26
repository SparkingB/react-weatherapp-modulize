import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import WeatherApp from './components/WeatherApp';
import { store } from './store/configureStore';
import "./styles/index.css"

ReactDOM.render(
    <Provider store={store}>
        <WeatherApp />
    </Provider>,
    document.getElementById('root')
);

