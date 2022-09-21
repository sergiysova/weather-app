import React from 'react';

import {Header} from '../components';

const withHeader = (Component: React.ComponentType, className: string = '') => () => (
    <div className={`layout ${className}`}>
        <Header />
        <Component />
    </div>
);

export default withHeader;