import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import Select, {ValueType} from "react-select";

import {IStatus, IWeather, SelectOption} from "../util/types";
import {citiesList} from "../util/data";
import Map from './Map';

import {getWeatherForCity} from "../util/api";

const locations: SelectOption[] = [
    {
        value: '',
        label: 'Choose your city'
    },
    ...citiesList.map(city => ({
        label: city,
        value: city
    }))
];

type stateType = {
    status: IStatus,
    weather: IWeather | null
}

const initaltState: stateType = {
    weather: null,
    status: {
        loading: false,
        error: null
    }
}

const WeatherMonitor: React.FunctionComponent = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentCity: SelectOption | undefined = locations.find(city => city.value === searchParams.get('city'));
    const [city, setCity] = useState<SelectOption>(currentCity || locations[0]);

    const [weather, setWeather] = useState<stateType>(initaltState);

    useEffect(() => {
        if(city.value) {
            getWeather(city.value);
            setSearchParams(`?city=${city.value}`);
        } else {
            setWeather({
                weather: null,
                status: {
                    loading: false,
                    error: null
                }
            })
        }
    },[city, setSearchParams])

    const handleCityChange = (option: ValueType<SelectOption, false>) => {
        if (option) setCity(option);
    }

    const getWeather = async (city: string) => {
        setWeather({
            weather: null,
            status: {
                loading: true,
                error: null
            }
        })

        try {
            const weather = await getWeatherForCity(city);

            if(weather.error) {
                setWeather({
                    weather: null,
                    status: {
                        loading: false,
                        error: weather.error.message
                    }
                })
            } else {
                setWeather({
                    weather: weather,
                    status: {
                        loading: false,
                        error: null
                    }
                })
            }
        }
        catch (e: any) {
            setWeather({
                weather: null,
                status: {
                    loading: true,
                    error: e.message || 'Something went wrong, please try again later'
                }
            })
        }
    }

    return (
        <section className="monitor p-10 bg-gray-300">
            <div className="container mx-auto border-2 rounded-md border-gray-600 p-6 grid grid-cols-2 gap-6">
                <div className="w1/2">
                    <div className="border rounded-md border-gray-600 p-6 h-full">
                        <h1 className="text-2xl font-bold mb-3">{city.value ? `Weather for ${city.label}` : 'No city chosen'} {}</h1>
                        {
                            !weather.weather ? (
                                <div className="no-data mb-12">
                                    {
                                        weather.status.loading && <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24" />
                                    }
                                    {
                                        weather.status.error && <p className="text-red-800">{weather.status.error}</p>
                                    }
                                </div>
                            ) : (
                                <div className="weather-overview mb-12">
                                    <div className="flex items-center py-2">
                                        <img src={weather.weather.current.condition.icon} alt={weather.weather.current.condition.icon} />
                                        <p className="text-xl text-blue-900">{weather.weather.current.condition.text}</p>
                                    </div>
                                    <p>Temperature: <span className="font-bold text-blue-900 text-xl">{weather.weather.current.temp_c}°</span></p>
                                    <p>Feels like: <span className="font-bold text-blue-900">{weather.weather.current.feelslike_c}°</span></p>
                                    <p>Wind speed: <span className="font-bold text-blue-900">{weather.weather.current.wind_kph}</span></p>
                                    <p>Wind direction: <span className="font-bold text-blue-900">{weather.weather.current.wind_dir}</span></p>
                                </div>
                            )
                        }
                        <h2 className="text-2xl font-bold">Get weather for another city</h2>
                        <div className="flex gap-3 mt-3">
                            <form className="flex-1">
                                <Select
                                    options={locations}
                                    value={city}
                                    placeholder="Choose your city"
                                    onChange={handleCityChange}
                                    isDisabled={weather.status.loading}
                                />
                            </form>
                        </div>
                    </div>
                </div>
                <div className="border rounded-md border-gray-600 p-6">
                   <Map lon={weather.weather ? weather.weather.location.lon : 30.52} lat={weather.weather ? weather.weather.location.lat : 50.45}/>
                </div>
            </div>
        </section>
    );
}

export default WeatherMonitor;
