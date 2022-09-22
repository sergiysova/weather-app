import React from 'react';
import { MapContainer, TileLayer, useMap} from 'react-leaflet';

type MapProps = {
    lat: number,
    lon: number
}

const ChangeView: React.FunctionComponent<MapProps> = ({lat, lon}) => {
    const map = useMap();
    console.log(lat, lon)
    map.setView([lat, lon], 13);
    return null;
}

const Map: React.FunctionComponent<MapProps> = ({lat, lon}) => {
    return (
        <>
            <MapContainer center={[lon, lat]} zoom={13} style={{height: '400px'}} scrollWheelZoom={false}>
                <ChangeView lat={lat} lon={lon}/>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>

        </>

    );
}

export default Map;