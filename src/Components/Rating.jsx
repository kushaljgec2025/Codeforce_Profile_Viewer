import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

function Rating({ rating_info }) {
  const [ratingData, setRatingData] = useState([]);
  const [width, setwidth] = useState(window.innerWidth - 200);
  const [height, setheight] = useState(window.innerHeight / 2);

  useEffect(() => {
    if (rating_info?.result) {
      const ratingarray = rating_info.result.map((item) => item.newRating);
      const ratingid = rating_info.result.map((item, index) => index + 1);
      setRatingData({ ratingarray, ratingid });
    }
    setwidth(window.innerWidth / 1.2);
    setheight(window.innerHeight / 2);
  }, [rating_info, width, height]);

  console.log(ratingData);
  return (
    <div>
      {ratingData.ratingarray && ratingData.ratingid && (
        <LineChart
          xAxis={[{ data: ratingData.ratingid }]}
          series={[
            {
              data: ratingData.ratingarray,
              color: "#fdb462",
            },
          ]}
          width={width}
          height={height}
        />
      )}
    </div>
  );
}

export default Rating;
