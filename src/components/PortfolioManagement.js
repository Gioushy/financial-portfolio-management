import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as Yup from "yup";

const PortfolioManagement = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      if (editingIndex === -1) {
        setPortfolios([...portfolios, values]);
      } else {
        const updatedPortfolios = [...portfolios];
        updatedPortfolios[editingIndex] = values;
        setPortfolios(updatedPortfolios);
        setEditingIndex(-1);
      }
      resetForm();
    },
  });

  const handleEdit = (index) => {
    setEditingIndex(index);
    formik.setValues(portfolios[index]);
  };

  const handleDelete = (index) => {
    const updatedPortfolios = portfolios.filter((_, i) => i !== index);
    setPortfolios(updatedPortfolios);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Portfolio Management
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mb: 4 }}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Portfolio Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          id="description"
          name="description"
          label="Description"
          multiline
          rows={4}
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          {editingIndex === -1 ? "Create Portfolio" : "Update Portfolio"}
        </Button>
      </Box>
      <List>
        {portfolios.map((portfolio, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={portfolio.name}
              secondary={portfolio.description}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEdit(index)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(index)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PortfolioManagement;
