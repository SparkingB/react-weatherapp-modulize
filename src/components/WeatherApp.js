import React from 'react';
import { fromPairs, transpose, mergeAll, merge } from 'ramda';
import { WeatherHeader } from './WeatherHeader';
import { WeatherDataView } from './WeatherDataView';


const authToken = 'CWB-352E09AB-03DA-4E13-BB17-83A9CE672D46';
const getConfig = {
    method: 'GET',
    headers: {
        'Content-type': 'application/json',
        Authorization: authToken,
    },
};


export class WeatherApp extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            weathers: [],
            loadingClassName: "hidden",
            test: []
        };

        this.dealFetchResponse = this.dealFetchResponse.bind(this);
        this.fetchRequest = this.fetchRequest.bind(this);
    }


    componentWillMount() {
        this.fetchRequest();
    }


    fetchRequest(select = '新北市') {
        console.log(select);
        const requestUrl = '/F-D0047-091?locationName=' + select + '&elementName=MinT,MaxT,T,PoP,Wx&sort=time';
        fetch(requestUrl, getConfig)
            .then((response) => {
                return response.json();
            })
            .then((response) => (setTimeout(() => this.dealFetchResponse(response), 500)));
        // .then(this.dealFetchResponse);


    }


    dealFetchResponse(responseObj) {
        const weatherElementObjAry = responseObj.records.locations[0].location[0].weatherElement;

        const weatherElementObjAryTime = weatherElementObjAry.map((weatherElementObj) => (weatherElementObj.time));
        const weatherElementObjAryName = weatherElementObjAry.map((weatherElementObj) => (weatherElementObj.elementName));


        const timeFilterFunc = (weatherElement, idx) => (
            (idx === 0 && weatherElement.startTime.indexOf('00:00') === -1)
            || (weatherElement.endTime.indexOf('18:00') !== -1)
        )
        const weatherElementObjArySevenDay = weatherElementObjAryTime.map(
            (time) => (time.filter(timeFilterFunc).splice(0, 7))
        );

        const elementValueFunc = (day) => (!day.parameter ? day.elementValue : day.parameter[0].parameterValue);
        const pure = transpose(weatherElementObjArySevenDay.map((wed) => (wed.map(elementValueFunc))));

        const mergeEleNameFunc = (p,idx) => (fromPairs([[weatherElementObjAryName[idx],p]]));
        const pureObj = pure.map((p)=>(mergeAll(p.map(mergeEleNameFunc))));

        const date = weatherElementObjArySevenDay[0].map((wed)=>(wed.startTime.slice(5, 10).replace('-', '/')));
        const dateObj = date.map((d,idx)=>(fromPairs([['wDate',d]])));

        const weathers =dateObj.map((d,idx)=>(merge(pureObj[idx],d)));

        this.setState({ weathers: weathers, loadingClassName: "hidden", test: weatherElementObjAry })
    }


    render() {

        return (
            <div className="container">
                <WeatherHeader
                    onSelect={
                        (select) => {
                            this.setState({ loadingClassName: "visible" })
                            this.fetchRequest(select);
                        }
                    }
                />
                <WeatherDataView
                    weathers={this.state.weathers}
                    loadingClassName={this.state.loadingClassName}
                />
            </div>
        )
    }
}
