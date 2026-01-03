import React, { useEffect, useRef, useState } from 'react';
import { loadGoogleMapsScript, calculateBounds } from '../utils/mapsUtils';

const MapComponent = ({ mines, selectedMine, onMineSelect }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      setError('Google Maps API key is not configured');
      setLoading(false);
      return;
    }

    const initMap = async () => {
      try {
        await loadGoogleMapsScript(apiKey);

        const { center, zoom } = calculateBounds(mines);

        const mapInstance = new window.google.maps.Map(mapRef.current, {
          center,
          zoom,
          mapTypeControl: true,
          fullscreenControl: true,
          streetViewControl: true,
        });

        setMap(mapInstance);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    initMap();
  }, [apiKey]);

  // Update markers when mines change
  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markers.forEach((marker) => marker.setMap(null));

    // Create new markers
    const newMarkers = mines.map((mine) => {
      const [lng, lat] = mine.geometry.coordinates;
      const isSelected = selectedMine && selectedMine.properties.mine_id === mine.properties.mine_id;

      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map,
        title: mine.properties.display_name,
        icon: isSelected
          ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
          : 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      });

      marker.addListener('click', () => {
        onMineSelect(mine);
      });

      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 200px;">
            <h3 style="margin: 0 0 5px 0; font-weight: bold;">${mine.properties.display_name}</h3>
            <p style="margin: 3px 0; font-size: 12px;"><strong>State:</strong> ${mine.properties.state}</p>
            <p style="margin: 3px 0; font-size: 12px;"><strong>District:</strong> ${mine.properties.district}</p>
            <p style="margin: 3px 0; font-size: 12px;"><strong>Sub-district:</strong> ${mine.properties.subdistrict}</p>
          </div>
        `,
      });

      marker.addListener('mouseover', () => {
        infoWindow.open(map, marker);
      });

      marker.addListener('mouseout', () => {
        infoWindow.close();
      });

      return marker;
    });

    setMarkers(newMarkers);

    // Re-center and zoom when selected mine changes
    if (selectedMine) {
      const [lng, lat] = selectedMine.geometry.coordinates;
      map.panTo({ lat, lng });
      map.setZoom(10);
    }
  }, [mines, selectedMine, map]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-red-50">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Error loading map</p>
          <p className="text-red-500 text-sm">{error}</p>
          <p className="text-gray-600 text-xs mt-2">Please ensure your Google Maps API key is set in .env.local</p>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full" />;
};

export default MapComponent;
