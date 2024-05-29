import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardContent, Typography } from '@mui/material';
import './DashContent.css';
import { IoFastFoodOutline } from "react-icons/io5";
import { FaMobile } from "react-icons/fa6";
import { GiBookshelf ,GiLipstick } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const monthlyData = {
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
        categories: ['January', 'February', 'March', 'April', 'May'],
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
      data: [65, 59, 80, 81, 56], 
    }],
  };
  
  
  const yearlyData = {
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
        categories: ['2020', '2021', '2022', '2023', '2024'], 
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
      data: [120, 150, 170, 140, 160], 
    }],
  };
  
  
  
  
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="overview">
        <Card className="card3">
          <CardContent>
            <Typography variant="h5" component="h2">
              <span className='overviewTitle'>Monthly Overview</span>
            </Typography> 
            <ReactApexChart options={monthlyData.options} series={monthlyData.series} type="bar" height={""} />
          </CardContent>
        </Card>
        <Card className="card3">
          <CardContent>
            <Typography variant="h5" component="h2">
              <span className='overviewTitle'>Yearly Overview</span>
            </Typography>
            <ReactApexChart options={yearlyData.options} series={yearlyData.series} type="bar" height={""} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
