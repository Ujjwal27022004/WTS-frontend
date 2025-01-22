import React, { useState } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';

const MapComponent = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [path, setPath] = useState([]);

  const handleRouteRequest = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/api/route?source=${source}&destination=${destination}`);
      const routeData = response.data;

      // Parse the coordinates for the path from the API response
      const coordinates = JSON.parse(routeData).routes[0].geometry.coordinates;
      const pathCoords = coordinates.map((coord) => [coord[1], coord[0]]); // Convert to [latitude, longitude]
      setPath(pathCoords);
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  return (
    <div>
      <h2>Enter Source and Destination</h2>
      <input 
        type="text" 
        placeholder="Source" 
        value={source} 
        onChange={(e) => setSource(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Destination" 
        value={destination} 
        onChange={(e) => setDestination(e.target.value)} 
      />
      <button onClick={handleRouteRequest}>Get Route</button>

      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {path.length > 0 && <Polyline positions={path} color="blue" />}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
