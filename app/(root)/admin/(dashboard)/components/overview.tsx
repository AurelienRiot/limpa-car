"use client";

import React, { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import { useTheme } from "next-themes";
import { GraphDataProps } from "@/actions/get-graph-revenue";
import dynamic from "next/dynamic";
const DynamicReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface OverviewProps {
  data: GraphDataProps[];
}

export const Overview: React.FC<OverviewProps> = ({ data }) => {
  const { theme, systemTheme } = useTheme();
  const [windowWidth, setWindowWidth] = useState(640);
  const [windowState, setWindowState] = useState({
    fontSize: "12px",
    reverse: false,
  });

  const series = [
    {
      name: "Commandes",
      data: data.map((item) => item.totalOrder),
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    if (windowWidth < 640) {
      setWindowState({ fontSize: "12px", reverse: true });
    } else if (windowWidth < 1024) {
      setWindowState({ fontSize: "14px", reverse: false });
    } else {
      setWindowState({ fontSize: "16px", reverse: false });
    }
  }, [windowWidth]);

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
        borderRadius: windowState.reverse ? 2 : 4,
        horizontal: windowState.reverse,
        borderRadiusApplication: "end",
        columnWidth: windowState.reverse ? "50%" : "90%",
        dataLabels: {
          position: windowState.reverse ? "top" : "center",
          orientation: windowState.reverse ? "horizontal" : "vertical",
        },
      },
    },
    xaxis: {
      categories: data.map((item) => item.month),

      labels: {
        offsetY: windowState.reverse ? -10 : 0,
        offsetX: windowState.reverse ? -5 : 0,
        rotate: windowState.reverse ? -45 : 0,
        rotateAlways: windowState.reverse,
        formatter: windowState.reverse
          ? (value: string) => `${value} €`
          : (value: string) => `${value}`,
        style: {
          colors: "#888888",
          fontSize: windowState.fontSize,
        },
      },
      axisBorder: {
        offsetY: windowState.reverse ? 40 : 0,
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: windowState.reverse
          ? (value: number) => `${value}`
          : (value: number) => `${value} €`,
        style: {
          colors: "#888888",
          fontSize: windowState.fontSize,
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
      fontSize: windowState.fontSize,
      offsetX: windowState.reverse ? 0 : 40,
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
      <DynamicReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
        padding={{ bottom: 40 }}
      />{" "}
    </div>
  );
};
