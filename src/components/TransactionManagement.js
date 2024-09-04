import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);

  const formik = useFormik({
    initialValues: {
      type: "",
      asset: "",
      amount: "",
      price: "",
    },
    validationSchema: Yup.object({
      type: Yup.string().required("Required"),
      asset: Yup.string().required("Required"),
      amount: Yup.number().required("Required").positive("Must be positive"),
      price: Yup.number().required("Required").positive("Must be positive"),
    }),
    onSubmit: (values, { resetForm }) => {
      const newTransaction = {
        ...values,
        date: new Date().toLocaleString(),
        total: values.amount * values.price,
      };
      setTransactions([newTransaction, ...transactions]);
      resetForm();
    },
  });

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Transaction Management
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="type-label">Transaction Type</InputLabel>
              <Select
                labelId="type-label"
                id="type"
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                error={formik.touched.type && Boolean(formik.errors.type)}
              >
                <MenuItem value="buy">Buy</MenuItem>
                <MenuItem value="sell">Sell</MenuItem>
                <MenuItem value="transfer">Transfer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="asset"
              name="asset"
              label="Asset"
              value={formik.values.asset}
              onChange={formik.handleChange}
              error={formik.touched.asset && Boolean(formik.errors.asset)}
              helperText={formik.touched.asset && formik.errors.asset}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="amount"
              name="amount"
              label="Amount"
              type="number"
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="price"
              name="price"
              label="Price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Transaction
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Typography variant="h5" gutterBottom>
        Recent Transactions
      </Typography>
      <List>
        {transactions.map((transaction, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${transaction.type.toUpperCase()} ${transaction.asset}`}
              secondary={`Amount: ${transaction.amount}, Price: $${
                transaction.price
              }, Total: $${transaction.total.toFixed(2)}, Date: ${
                transaction.date
              }`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TransactionManagement;
