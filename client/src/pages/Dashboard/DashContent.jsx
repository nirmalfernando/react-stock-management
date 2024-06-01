import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Card, CardContent, Typography } from "@mui/material";
import "./DashContent.css";
import axios from "axios";

const Dashboard = () => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [monthlyData, setMonthlyData] = useState({
    options: {
      chart: {
        id: "monthly-chart",
        type: "bar",
        height: 400,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "80%",
        },
      },
      xaxis: {
        categories: [], // Will be updated with fetched data
        labels: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: true,
        },
      },
      colors: ["#E87972"],
    },
    series: [
      {
        name: "Monthly Overview",
        data: [], // Will be updated with fetched data
      },
    ],
  });
  const [yearlyData, setYearlyData] = useState({
    options: {
      chart: {
        id: "yearly-chart",
        type: "bar",
        height: 400,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "80%",
        },
      },
      xaxis: {
        categories: [], // Will be updated with fetched data
        labels: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: true,
        },
      },
      colors: ["#E87972"],
    },
    series: [
      {
        name: "Yearly Overview",
        data: [], // Will be updated with fetched data
      },
    ],
  });

  const [isDataAvailable, setIsDataAvailable] = useState(true);

  useEffect(() => {
    const fetchDataMonthly = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8800/api/salesorders/totSalesMonthly"
        ); // Adjust the endpoint if necessary
        const salesData = response.data;

        const categories = salesData.map(
          (item) => monthNames[new Date(item.month).getMonth()]
        );
        const data = salesData.map((item) => item.total_qty);

        const hasValidData = data.some((item) => item !== null);

        setMonthlyData((prevData) => ({
          ...prevData,
          options: {
            ...prevData.options,
            xaxis: {
              ...prevData.options.xaxis,
              categories: categories,
            },
          },
          series: [
            {
              ...prevData.series[0],
              data: data,
            },
          ],
        }));

        setIsDataAvailable(hasValidData);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsDataAvailable(false);
      }
    };
    const fetchDataYearly = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8800/api/salesorders/totSalesYearly"
        ); // Adjust the endpoint if necessary
        const salesData = response.data;

        const categories = salesData.map((item) => item.year);
        const data = salesData.map((item) => item.total_qty);

        const hasValidData = data.some((item) => item !== null);

        setYearlyData((prevData) => ({
          ...prevData,
          options: {
            ...prevData.options,
            xaxis: {
              ...prevData.options.xaxis,
              categories: categories,
            },
          },
          series: [
            {
              ...prevData.series[0],
              data: data,
            },
          ],
        }));

        setIsDataAvailable(hasValidData);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsDataAvailable(false);
      }
    };

    fetchDataMonthly();
    fetchDataYearly();
  }, []);

  const nullMonthlyData = {
    options: {
      chart: {
        id: 'monthly-chart',
        type: 'bar',
        height: 400,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '80%',
        },
      },
      xaxis: {
        categories: [monthNames],
        labels: {
          show: false
        }
      },
      yaxis: {
        labels: {
          show: true
        }
      },
      colors: ['#E87972'],
    },
    series: [{
      name: 'Monthly Overview',
      data: [10,20,30,40,50,60,70,80,90,100,110,120]
    }],
  };

  const currentYear = new Date().getFullYear();

  const nullYearlyData = {
    options: {
      chart: {
        id: 'yearly-chart',
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '80%',
        },
      },
      xaxis: {
        categories: [currentYear],
        labels: {
          show: false
        }
      },
      yaxis: {
        labels: {
          show: true
        }
      },
      colors: ['#D74339'],
    },
    series: [{
      name: 'Yearly Overview',
      data: [100],
    }],
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="overview">
        <Card className="card3">
          <CardContent>
            <Typography variant="h5" component="h2">
              <span className="overviewTitle">Monthly Overview</span>
            </Typography>
            {isDataAvailable ? (
              <ReactApexChart
                options={monthlyData.options}
                series={monthlyData.series}
                type="bar"
                height={""}
              />
            ) : (
              <ReactApexChart
                options={nullMonthlyData.options}
                series={nullMonthlyData.series}
                type="bar"
                height={""}
              />
            )}
          </CardContent>
        </Card>
        <Card className="card3">
          <CardContent>
            <Typography variant="h5" component="h2">
              <span className="overviewTitle">Yearly Overview</span>
            </Typography>
            {isDataAvailable ? (
              <ReactApexChart
                options={yearlyData.options}
                series={yearlyData.series}
                type="bar"
                height={""}
              />
            ) : (
              <ReactApexChart
                options={nullYearlyData.options}
                series={nullYearlyData.series}
                type="bar"
                height={""}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
