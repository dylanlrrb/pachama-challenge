import React, { useState, useEffect } from "react";
import { Chart } from 'react-charts'
import { fetchCarbonDetails } from '../fetchers';

const CarbonGraph = ({forest_name}) => {
  const monthAgo = '2021-6-1';
  const [carbonDetails, setCarbonDetails] = useState({hits: [], metadata: {}})

  useEffect(() => {
    (async () => {
      const carbonDetails = await fetchCarbonDetails(forest_name, monthAgo);
      setCarbonDetails(carbonDetails);

      
    })();
  }, [forest_name]);

  const data = React.useMemo(
    () => [
      {
        label: carbonDetails.metadata.y_units,
        data: carbonDetails.hits.map(({collection_time, value}) => {
          return {
            primary: collection_time,
            secondary: value,
          }
        }),
      },
    ],
    [carbonDetails.hits, carbonDetails.metadata.y_units]
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'utc', position: 'bottom', showTicks: false },
      { type: 'linear', position: 'left' },
    ],
    []
  )

  return (
    <div
      style={{
        width: '600px',
        height: '400px',
      }}
    >
      <span>{carbonDetails.metadata.y_units}</span>
      <Chart data={data} axes={axes} />
    </div>
  )
}

export default CarbonGraph;