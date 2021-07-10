import React, { useState, useEffect } from "react";
import { fetchForestDetails } from '../fetchers';
import { capitalize } from '../helpers';
import { useParams } from "react-router-dom";
import CarbonGraph from '../components/CarbonGraph';
import './DetailsPage.css'

export default function DetailsPage() {
  const { forest_name } = useParams();
  const [forestDetails, setForestDetails] = useState({
    name: "",
    thumbnail_image: "",
    description_long: "",
    latitude: "",
    longitude: "",
    hectares: "",
    country: "",
  });

  useEffect(() => {
    (async () => {
      const forestDetails = await fetchForestDetails(forest_name);
      setForestDetails(forestDetails);

      
    })();
  }, [forest_name]);

  return (
    <div className="details-page">
      <div className="details-page__hero-image" style={{
          backgroundImage: `url(${forestDetails.thumbnail_image})`,
        }} />
      <div className="details-page__hero-title">
        <span>{capitalize(forestDetails.name)}</span>
      </div>
      <div className="details-page__details">
        <div className="details-page__details__info">
          <p>Country: {forestDetails.country}</p>
          <p>Coordinates: {forestDetails.latitude} {forestDetails.longitude}</p>
          <p>Size: {forestDetails.hectares} Hectares</p>
          <p>{forestDetails.description_long}</p>
        </div>
        <div className="details-page__details__chart">
          <p>Metrics over the last 30 days:</p>
          <CarbonGraph forest_name={forest_name} />
        </div>
        
      </div>
      
    </div>
  );
}
