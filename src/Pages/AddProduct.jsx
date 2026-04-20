import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AddProduct() {
  const navigate = useNavigate();

  const [newProducts, setNewProducts] = useState({
    title: "",
    description: "",
    rating: {
      rate: "",
      count: "",
    },
  });

  const [isPosted, setIsPosted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const fieldName = name.split("rating.")[1];
    if (name.includes("rating.")) {
      setNewProducts({
        ...newProducts,
        rating: {
          ...newProducts.rating,
          [fieldName]: value,
        },
      });
    } else {
      setNewProducts({
        ...newProducts,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/products",
        newProducts
      );

      setIsPosted(true);

      setTimeout(() => {
        setIsPosted(false);
        navigate("/products");
      }, 2000);

      setNewProducts({
        title: "",
        description: "",
        image: "",
        rating: {
          rate: "",
          count: "",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Add Product</h1>

      <form onSubmit={handleSubmit}>
        <Card
          variant="outlined"
          style={{
            padding: "20px",
            maxWidth: "400px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <TextField
            id="outlined-basic"
            value={newProducts.title}
            name="title"
            label="Title"
            variant="outlined"
            onChange={handleChange}
          />
          <br />
          <TextField
            id="outlined-basic"
            value={newProducts.description}
            name="description"
            label="Description"
            variant="outlined"
            onChange={handleChange}
          />
          <br />
          <TextField
            id="outlined-basic"
            value={newProducts.rating.rate}
            name="rating.rate"
            label="Rate"
            variant="outlined"
            onChange={handleChange}
          />
          <br />
          <TextField
            id="outlined-basic"
            value={newProducts.rating.count}
            name="rating.count"
            label="Count"
            variant="outlined"
            onChange={handleChange}
          />
          <br />

          <Button variant="contained" type="submit">
            Add Product
          </Button>
          <br />
          {isPosted && (
            <Alert severity="success">
            Product added Successfully. <br/>
             Redirecting back to Products Page
            </Alert>
          )}
          <br />
        </Card>
      </form>
    </div>
  );
}
