import { useEffect } from 'react';

const LoadGoogleMapsApi = ({ apiKey, onLoad }) => {
  useEffect(() => {
    const loadScript = async () => {
      const googleMapsScript = document.createElement('script');
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      googleMapsScript.async = true;
      window.document.body.appendChild(googleMapsScript);

      googleMapsScript.addEventListener('load', onLoad);
    };

    loadScript();
  }, [apiKey, onLoad]);

  return null;
};

export default LoadGoogleMapsApi;