import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAxios } from "../Components/useAxios";

import axios from "axios";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFetch, setIsFetch] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(null);

  const { products: getproducts } = useAxios(
    `http://localhost:3000/products/${id}`
  );

  console.log(getproducts);

  useEffect(() => {
    try {
      setUpdateProduct(getproducts);
    } catch (error) {
      setIsFetch(true);
      setTimeout(() => {
        setIsFetch(true);
        navigate("/products");
      }, 2000);
    }
  },[getproducts]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const fieldName = name.split("rating.")[1];
    if (name.includes("rating.")) {
      setUpdateProduct({
        ...updateProduct,
        rating: {
          ...(updateProduct.rating || {}),
          [fieldName]: value,
        },
      });
    } else {
      setUpdateProduct({
        ...updateProduct,
        [name]: value,
      });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updateData = async () => {
      try {
        await axios.put(`http://localhost:3000/products/${id}`, updateProduct);
        setIsUpdated(true);
        setTimeout(() => {
          navigate("/products");
        }, 3000);
      } catch (err) {
        alert("Unexpected error occured!");
      }
    };
    updateData();
  };

  if (updateProduct !== null) {
    return (
      <div>
        {isFetch && (
          <Alert severity="error">Selected Product fetch failed ...</Alert>
        )}
        <h1 style={{ textAlign: "center" }}>Update Product</h1>
        <form onSubmit={handleUpdate}>
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
              name="title"
              label="Update Title"
              variant="outlined"
              value={updateProduct.title}
              onChange={handleChange}
            />
            <br />
            <TextField
              id="outlined-basic"
              name="description"
              label="Update Description"
              variant="outlined"
              value={updateProduct.description}
              onChange={handleChange}
            />
            <br />
            <TextField
              id="outlined-basic"
              name="rating.rate"
              label="Update Rate"
              variant="outlined"
                value = {updateProduct.rating?.rate}
              onChange={handleChange}
            />
            <br />
            <TextField
              id="outlined-basic"
              name="rating.count"
              label="Update Count"
              variant="outlined"
                value = {updateProduct.rating?.count}
              onChange={handleChange}
            />
            <br />
            <Button variant="contained" type="submit">
              Update Product
            </Button>
            {isUpdated && (
              <Alert severity="success">
                Product Updated Successfully. <br />
                Redirecting back to Products Page
              </Alert>
            )}
          </Card>
        </form>
      </div>
    );
  }
  return (
    <>
      <h1>Loading...</h1>
    </>
  );
}
