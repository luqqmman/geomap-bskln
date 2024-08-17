'use client';

import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

const getColorByDirectorat = (idDirektorat) => {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#731F57', '#23A327'];
  return colors[idDirektorat % colors.length];
};

const Legend = ({ directorates }) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: '30px',
      left: '30px',
      backgroundColor: 'white',
      padding: '10px',
      borderRadius: '5px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      zIndex: 1000
    }}>
      <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Direktorat</h4>
      {directorates.map((direktorat, index) => (
        <div key={direktorat.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <span
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: getColorByDirectorat(direktorat.id),
              display: 'inline-block',
              marginRight: '8px',
            }}
          ></span>
          <span style={{ fontSize: '12px' }}>{direktorat.namaDirektorat}</span>
        </div>
      ))}
    </div>
  );
};

const MapWithCountries = () => {
  const [geoData, setGeoData] = useState(null);
  const [directorates, setDirectorates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/negara');
        const negaraData = await response.json();
        const responseOriginalGeoJSON = await fetch('/geo.json');
        const originalGeoJSON = await responseOriginalGeoJSON.json();

        const modifiedGeoData = originalGeoJSON.features.map((feature) => {
          const matchingCountry = negaraData.find(
            (negara) => negara.kodeNegara === feature.properties.iso_a2
          );

          if (matchingCountry) {
            feature.properties.direktorat = matchingCountry.direktorat;
            feature.properties.kawasan = matchingCountry.kawasan;
          }

          return feature;
        });

        setGeoData({ type: 'FeatureCollection', features: modifiedGeoData });

        const responseDirektorat = await fetch('/api/direktorat');
        const direktorat = await responseDirektorat.json();
        setDirectorates(direktorat);
      } catch (error) {
        console.error('Error fetching negara data:', error);
      }
    };

    fetchData();
  }, []);

  const onEachCountry = (country, layer) => {
    const directoratId = country.properties.direktorat?.id;
    const countryName = country.properties.admin;
    const countryFlagURL = `https://flagcdn.com/w320/${country.properties.iso_a2.toLowerCase()}.png`; // URL untuk flag negara
    const color = getColorByDirectorat(directoratId);
    const randomFillOpacity = [0.6, 0.65, 0.7, 0.75, 0.8];

    layer.setStyle({
      fillColor: color,
      weight: 0.7,
      opacity: 1,
      color: 'white',
      dashArray: '25',
      fillOpacity: randomFillOpacity[Math.floor(Math.random() * randomFillOpacity.length)]
    });

    const tooltipContent = `
        <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 5px; text-align: center;">
            <img src="${countryFlagURL}" alt="${countryName} flag" style="width: 50px; height: auto; margin-left: auto; margin-right: auto; margin-bottom: 5px; border-radius: 3px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);" />
            <strong style="font-size: 14px;">${countryName}</strong>
            <p style="font-size: 12px; margin: 3px 0;">${country.properties.kawasan?.namaKawasan}</p>
            <p style="font-size: 12px; margin: 3px 0;">${country.properties.direktorat?.namaDirektorat}</p>
        </div>
    `;

    layer.bindTooltip(tooltipContent, { className: 'custom-tooltip', direction: 'top', offset: [0, -10] });
  };

  return (
    <div style={{ position: 'relative' }}>
      <MapContainer style={{ height: '400px', width: '100%' }} center={[30, 0]} zoom={2}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; <a href=&quot;https://carto.com/attributions&quot;>CARTO</a>"
          noWrap={true}
          bounds={[
            [-90, -180],
            [90, 180],
          ]}
        />
        {geoData && (
          <GeoJSON
            data={geoData}
            onEachFeature={onEachCountry}
          />
        )}
      </MapContainer>
      <Legend directorates={directorates} />
    </div>
  );
};

export default MapWithCountries;
