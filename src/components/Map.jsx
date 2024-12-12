import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Component to recenter the map
const RecenterMap = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(location, map.getZoom());
  }, [location, map]);
  return null;
};

const MapComponent = ({ location, dangerZone }) => {
  // Default location (San Francisco coordinates)
  const defaultLocation = [37.7749, -122.4194];

  // Ensure that location is an array of two numbers (latitude and longitude)
  const isValidLocation = Array.isArray(location) && location.length === 2;
  const [lat, lng] = isValidLocation ? location : defaultLocation;

  // Set the marker color based on the dangerZone status
  const markerIcon = new L.Icon({
    iconUrl: dangerZone
      ? "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x-red.png" // Red icon for danger zone
      : "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png", // Default icon
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <MapContainer center={[lat, lng]} zoom={10} style={{ height: "50vh", width: "100%" }}>
      <RecenterMap location={[lat, lng]} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lng]} icon={markerIcon}>
        <Popup>{dangerZone ? "Danger Zone!" : "Safe Zone"}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
