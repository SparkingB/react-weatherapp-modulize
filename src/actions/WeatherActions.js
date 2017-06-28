import ActionTypes from './ActionTypes';


const authToken = 'CWB-352E09AB-03DA-4E13-BB17-83A9CE672D46';
const getConfig = {
    method: 'GET',
    headers: {
        'Content-type': 'application/json',
        Authorization: authToken,
    },
};

export const WeatherActions = {
    loadWeather(select = '新北市') {
        return (dispatch) => {

            console.log("loadWeather");

            dispatch({
                type: ActionTypes.TOGGLE_LOADING_PAGE
            })

            console.log(select);

            //when using express
            //requestUrl = '= '/api/F-D0047-091?locationName=' + select + '&elementName=MinT,MaxT,T,PoP,Wx&sort=time';'
            //when using webpack dev server
            //requestUrl = '= '/F-D0047-091?locationName=' + select + '&elementName=MinT,MaxT,T,PoP,Wx&sort=time';'
            const requestUrl = '/F-D0047-091?locationName=' + select + '&elementName=MinT,MaxT,T,PoP,Wx&sort=time';


            fetch(requestUrl, getConfig)
                .then((response) => {
                    console.log("fetch1");
                    return response.ok ? response.json() : Promise.reject(response.status);
                })
                .then(json => {
                    console.log("fetch2");
                    return () =>
                        dispatch({
                            type: ActionTypes.LOAD_WEATHER_SUCCESS,
                            json,
                        })

                })
                .then(
                    (updateData) => {
                        console.log("fetch3");
                        const toggleLoadingPage = () => dispatch({
                            type: ActionTypes.TOGGLE_LOADING_PAGE
                        })

                        setTimeout(() => {
                            toggleLoadingPage();
                            updateData();
                        }, 500);
                    },
                    (errlog) => {
                        console.log(errlog);
                        dispatch({
                            type: ActionTypes.TOGGLE_LOADING_PAGE
                        })
                        dispatch({
                            type: ActionTypes.LOAD_WEATHER_FAIL,
                        })
                    }
                );
        };
    },
};
