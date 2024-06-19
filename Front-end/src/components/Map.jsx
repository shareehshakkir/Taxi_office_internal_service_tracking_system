import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import MapFullScreen from "./MapFullScreen";
import { useData } from "../hooks/useData";

export const MapWrapper = ({ height }) => {
  const { isLoading, error, data } = useData("req_rides", "api/retention");
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <MapContainer
      center={[data[1][0], data[1][1]]}
      zoom={10}
      style={{ width: "100%", height: height, zIndex: 10 }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkerClusterGroup>
        {data.map((marker, index) => (
          <Marker key={index} position={[marker[0], marker[1]]} />
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

const Map = ({ height }) => {
  return (
    <>
      <MapFullScreen />
      <MapWrapper height={height} />
    </>
  );
};

export default Map;
