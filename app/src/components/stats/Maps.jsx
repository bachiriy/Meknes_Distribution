import React, { useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";
import LoadGoogleMapsApi from "./LoadGoogleMapsApi";

setKey("AAIzaSyAf9Tr-LyvTm_kghHd8mhnRw_sKWilgGAo");
const geocodeAddress = async (address) => {
  try {
    const response = await fromAddress(address);
    const { lat, lng } = response.results[0].geometry.location;
    return { latitude: lat, longitude: lng };
  } catch (error) {
    console.error("Error geocoding address:", error);
    return { latitude: null, longitude: null }; // Return default values
  }
};

const Map = ({ center, communesData }) => {
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  
  const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
  };

  const handleGoogleMapsLoad = () => {
    setIsGoogleMapsLoaded(true);
  };

  return (
    <>
      <LoadGoogleMapsApi
        apiKey="AIzaSyAf9Tr-LyvTm_kghHd8mhnRw_sKWilgGAo"
        onLoad={handleGoogleMapsLoad}
      />
      {isGoogleMapsLoaded && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={8}
        >
          {communesData.map((commune) => (
            <Marker
              key={commune.id}
              position={{ lat: commune.latitude, lng: commune.longitude }}
            />
          ))}
        </GoogleMap>
      )}
    </>
  );
};

export default function Maps() {
  const [communesData, setCommunesData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/stats/communes")
      .then((response) => response.json())
      .then(async (data) => {
        console.log(data);
        const geocodedCommunes = await Promise.all(
          data.communes.map(async (commune) => {
            const { latitude, longitude } = await geocodeAddress(
              commune.full_address
            );
            if (latitude !== null && longitude !== null) {
              return { ...commune, latitude, longitude };
            }
            return null; // Skip this commune
          })
        );
        setCommunesData(geocodedCommunes.filter(Boolean)); // Filter out null values
      })
      .catch((error) => console.error("Error fetching communes:", error));
  }, []);

  const center = { lat: -34.397, lng: 150.644 };

  return <Map center={center} communesData={communesData} />;
}
