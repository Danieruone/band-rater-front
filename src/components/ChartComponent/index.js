import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
// context
import { SocketContext } from "context/SocketContext";

export const ChartComponent = () => {
  const { socket } = useContext(SocketContext);
  const [bandList, setBandList] = useState([]);
  const [data, setData] = useState({
    bandNames: [],
    bandVotes: [],
  });

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      setBandList(bands);
    });
  }, [socket]);

  useEffect(() => {
    let names = [];
    let votes = [];
    bandList.map((band) => {
      names.push(band.name);
      votes.push(band.votes);
    });
    setData({
      bandNames: names,
      bandVotes: votes,
    });
  }, [bandList]);

  const options = {
    chart: {
      id: "votes-chart",
    },
    xaxis: {
      categories: data.bandNames,
    },
  };

  const series = [
    {
      name: "series-1",
      data: data.bandVotes,
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      width={300}
      height={300}
    />
  );
};