import React from 'react';

import withHeader from "../HOC/withHeader";
import {WeatherMonitor} from "../components";

const Monitor: React.FunctionComponent = () => {
    return (
        <div>
            <WeatherMonitor />
        </div>
    );
}

export default withHeader(Monitor, 'monitor');
