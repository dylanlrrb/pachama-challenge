import React, { useState, useEffect } from "react";
import { fetchForestDetails } from '../fetchers';
import { useParams } from "react-router-dom";
import CarbonGraph from '../components/CarbonGraph';

export default function DetailsPage() {
  const { id: forestId } = useParams();
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
      const forestDetails = await fetchForestDetails(forestId);
      setForestDetails(forestDetails);

      
    })();
  }, [forestId]);

  return (
    <div>
      <img src={forestDetails.thumbnail_image} alt={forestDetails.name}/>
      <div>Name: {forestDetails.name}</div>
      <div>Country: {forestDetails.country}</div>
      <div>Coordinates: {forestDetails.latitude} {forestDetails.longitude}</div>
      <div>Size: {forestDetails.hectares} Hectares</div>
      <div>{forestDetails.description_long}</div>
      <div>Metrics over the last 30 days:</div>
      <CarbonGraph forestId={forestId} />
    </div>
  );
}