import React, {useState} from 'react';
import Select, {ValueType} from 'react-select';
import {useNavigate } from "react-router-dom";

import {SelectOption} from "../util/types";
import {citiesList} from "../util/data";

const defaultValue: SelectOption = {
    value: '',
    label: 'Choose your city'
}

const locations: SelectOption[] = citiesList.map(city => ({
    label: city,
    value: city
}));

const Hero: React.FunctionComponent = () => {
    const [city, setCity] = useState<SelectOption>(defaultValue);

    const navigate = useNavigate();

    const handleCityChange = (option: ValueType<SelectOption, false>) => {
        if (option) setCity(option);
    }

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        navigate(`/monitor?city=${city.value}`)
    }
   console.log(locations);
    return (
        <section className="hero p-10 bg-gray-300">
            <div className="container mx-auto h-full">
                <div className="flex justify-center h-full flex-col w-2/5 text-gray-800">
                    <h1 className="text-4xl font-bold mb-3">Happy to see you here</h1>
                    <p>Please select your city</p>
                    <div className="flex gap-3 mt-3">
                        <form className="flex-1">
                            <Select
                                options={locations}
                                value={city}
                                placeholder="Choose your city"
                                onChange={handleCityChange}
                            />
                        </form>
                        <button
                            type="button"
                            className="bg-blue-500 transition-opacity hover:opacity-90 text-white font-bold py-1 px-4 rounded block disabled:opacity-25"
                            onClick={handleButtonClick}
                            disabled={!city.value}
                        >
                            Get Weather
                        </button>
                    </div>


                </div>
            </div>
        </section>
    );
}

export default Hero;
