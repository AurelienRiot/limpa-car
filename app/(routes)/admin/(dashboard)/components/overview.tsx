"use client";

import React, { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "next-themes";
import { GraphDataProps } from "@/actions-server/get-graph-revenue";
import { isWindowSmallerThan } from "@/lib/utils";

interface OverviewProps {
  data: GraphDataProps[];
}

export const Overview: React.FC<OverviewProps> = ({ data }) => {
  const { theme, systemTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [graphState, setGraphState] = useState({
    fontSize: "12px",
    reverse: false,
    reduceMonth: false,
  });

  const series = [
    {
      name: "Commandes",
      data: data.map((item) => item.totalOrder),
    },
  ];
  useEffect(() => {
    const checkMobile = () => {
      if (isWindowSmallerThan(640)) {
        setGraphState({ fontSize: "12px", reverse: true, reduceMonth: false });
        return;
      }
      if (isWindowSmallerThan(1150)) {
        setGraphState({ fontSize: "14px", reverse: false, reduceMonth: true });
        return;
      }
      setGraphState({ fontSize: "16px", reverse: false, reduceMonth: false });
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: "auto",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: graphState.reverse ? 2 : 4,
        horizontal: graphState.reverse,
        borderRadiusApplication: "end",
        columnWidth: graphState.reverse ? "50%" : "90%",
        dataLabels: {
          position: graphState.reverse ? "top" : "center",
          orientation: graphState.reverse ? "horizontal" : "vertical",
        },
      },
    },
    xaxis: {
      categories: graphState.reduceMonth
        ? data.map((item, index) => (index % 2 === 0 ? item.month : ""))
        : data.map((item) => item.month),
      labels: {
        offsetY: graphState.reverse ? -10 : 0,
        offsetX: graphState.reverse ? -5 : 0,
        rotate: graphState.reverse ? -45 : 0,
        rotateAlways: graphState.reverse,
        formatter: graphState.reverse
          ? (value: string) => `${value} €`
          : (value: string) => `${value}`,
        style: {
          colors: "#888888",
          fontSize: graphState.fontSize,
        },
      },
      axisBorder: {
        offsetY: graphState.reverse ? 40 : 0,
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: graphState.reverse
          ? (value: number) => `${value}`
          : (value: number) => `${value} €`,
        style: {
          colors: "#888888",
          fontSize: graphState.fontSize,
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    fill: {
      colors: ["#3498db", "#2ecc71"],
    },
    grid: {
      show: false,
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return `${value} €`;
        },
        title: {
          formatter: function () {
            return "";
          },
        },
      },
      shared: true,
      intersect: false,
      followCursor: true,
      marker: {
        show: true,
      },
      theme: theme === "system" ? systemTheme : theme,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontSize: graphState.fontSize,
      offsetX: graphState.reverse ? 0 : 40,
      onItemClick: {
        toggleDataSeries: true,
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: "#000",
        radius: 12,
      },
      labels: {
        colors: "#888888",
      },
    },
  };

  return (
    <div>
      {" "}
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
        padding={{ bottom: 40 }}
      />{" "}
    </div>
  );
};
