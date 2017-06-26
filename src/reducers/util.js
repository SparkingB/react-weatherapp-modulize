import { fromPairs, transpose, mergeAll, merge } from 'ramda';

export const _dealFetchResponse = (responseObj) => {
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

    const mergeEleNameFunc = (p, idx) => (fromPairs([[weatherElementObjAryName[idx], p]]));
    const pureObj = pure.map((p) => (mergeAll(p.map(mergeEleNameFunc))));

    const date = weatherElementObjArySevenDay[0].map((wed) => (wed.startTime.slice(5, 10).replace('-', '/')));
    const dateObj = date.map((d, idx) => (fromPairs([['wDate', d]])));

    const weathers = dateObj.map((d, idx) => (merge(pureObj[idx], d)));

    return { weathers: weathers, test: weatherElementObjAry };
}