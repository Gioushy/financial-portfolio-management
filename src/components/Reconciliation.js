import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Grid,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Reconciliation = () => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    amount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleAddTransaction = () => {
    if (newTransaction.date && newTransaction.amount) {
      setTransactions([...transactions, newTransaction]);
      setNewTransaction({ date: "", amount: "" });
    }
  };

  const chartData = {
    labels: transactions.map((t) => t.date),
    datasets: [
      {
        label: "Transaction Amount",
        data: transactions.map((t) => parseFloat(t.amount)),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
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
        text: "Transaction History",
      },
    },
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Reconciliation
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 3 }}>
            <TextField
              name="date"
              label="Date"
              type="date"
              value={newTransaction.date}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              name="amount"
              label="Amount"
              type="number"
              value={newTransaction.amount}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddTransaction}
            >
              Add Transaction
            </Button>
          </Box>
          <List>
            {transactions.map((transaction, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Date: ${transaction.date}`}
                  secondary={`Amount: $${transaction.amount}`}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <Line data={chartData} options={chartOptions} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reconciliation;
