export const getWeatherForCity = (city: string): Promise<any> => {
    return fetch(`http://api.weatherapi.com/v1/current.json?key=e975d7ead0b3431cb1c105902221809 &q=${city}&aqi=no`)
        .then(data => data.json())
        .catch(error => console.log(error));
}