import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

function Rating({ rating_info }) {
  const [ratingData, setRatingData] = useState([]);

  useEffect(() => {
    if (rating_info?.result) {
      const ratingarray = rating_info.result.map((item) => item.newRating);
      const ratingid = rating_info.result.map((item, index) => index + 1);
      setRatingData({ ratingarray, ratingid });
    }
  }, [rating_info]);
  console.log(ratingData);
  return (
    <div>
      {ratingData.ratingarray && ratingData.ratingid && (
        <LineChart
          xAxis={[{ data: ratingData.ratingid }]}
          series={[
            {
              data: ratingData.ratingarray,
            },
          ]}
          width={1200}
          height={500}
        />
      )}
    </div>
  );
}

export default Rating;
