//import { Promise } from 'es6-promise';

export const getCoords = new Promise((resolve, reject) => {
	navigator.geolocation.getCurrentPosition(position => {
		const { latitude, longitude } = position.coords;
		resolve({latitude, longitude});
	}, error => {
		reject(error.message);
	});
});

export function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

export function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
