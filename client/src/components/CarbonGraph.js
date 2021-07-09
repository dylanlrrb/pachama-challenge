import React, { useState, useEffect } from "react";
import { Chart } from 'react-charts'
import { fetchCarbonDetails } from '../fetchers';

const CarbonGraph = ({forestId}) => {
  const monthAgo = 100000;
  const [carbonDetails, setCarbonDetails] = useState({hits: [], metadata: {}})

  useEffect(() => {
    (async () => {
      const carbonDetails = await fetchCarbonDetails(forestId, monthAgo);
      setCarbonDetails(carbonDetails);

      
    })();
  }, [forestId]);

  const data = React.useMemo(
    () => [
      {
        label: carbonDetails.metadata.y_units,
        data: carbonDetails.hits.map(({timestamp, value}) => {
          return {
            primary: timestamp,
            secondary: value,
          }
        }),
      },
    ],
    [carbonDetails.hits, carbonDetails.metadata.y_units]
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom', showTicks: false },
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