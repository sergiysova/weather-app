import React from 'react';

import withHeader from "../HOC/withHeader";
import {Hero} from "../components";

const Home: React.FunctionComponent = () => {
    return (
        <div>
            <Hero />
        </div>
    );
}

export default withHeader(Home, 'home');
