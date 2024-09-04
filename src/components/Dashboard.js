import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { TrendingUp, TrendingDown } from "@mui/icons-material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  // Mock data for demonstration
  const portfolioValue = 150000;
  const dailyChange = 2500;
  const percentageChange = (dailyChange / portfolioValue) * 100;

  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Portfolio Value",
        data: [120000, 125000, 130000, 140000, 145000, 150000],
        backgroundColor: "rgba(30, 136, 229, 0.6)",
      },
    ],
  };

  const doughnutChartData = {
    labels: ["Stocks", "Bonds", "Real Estate", "Commodities"],
    datasets: [
      {
        data: [65000, 45000, 30000, 10000],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Portfolio Growth",
      },
    },
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Card elevation={3}>
            <CardHeader title="Total Portfolio Value" />
            <CardContent>
              <Typography variant="h4">
                ${portfolioValue.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card elevation={3}>
            <CardHeader title="Daily Change" />
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {dailyChange >= 0 ? (
                  <TrendingUp color="success" />
                ) : (
                  <TrendingDown color="error" />
                )}
                <Typography
                  variant="h4"
                  color={dailyChange >= 0 ? "success.main" : "error.main"}
                  sx={{ ml: 1 }}
                >
                  ${Math.abs(dailyChange).toLocaleString()} (
                  {percentageChange.toFixed(2)}%)
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Bar data={barChartData} options={chartOptions} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Portfolio Allocation
            </Typography>
            <Doughnut data={doughnutChartData} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
