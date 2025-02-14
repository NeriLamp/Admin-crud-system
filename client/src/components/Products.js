import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Container, Button, Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Products() {
const [products, setProducts] = useState([]);
const [productName, setProductName] = useState('');
const [category, setCategory] = useState('');
const [price, setPrice] = useState(0);
const [stock, setStock] = useState(0);

const [editingProduct, setEditingProduct] = useState(null);


 // Fetch users from the backend
 useEffect(() => { 
    Axios.get("http://localhost:3001/getUsers").then((response) => { 
      fetchProducts(response.data);
    }); 
  }, []);

   // Gauti produktus iš backend
   const fetchProducts = () => {
    Axios.get('http://localhost:3001/getProducts')
        .then((response) => {
            setProducts(response.data); // Nustato produktų duomenis į state
        })
        .catch((error) => {
            console.error('Klaida gaunant produktus:', error);
        });
};

// Sukurti naują produktą
const createProduct = () => {
    Axios.post('http://localhost:3001/createProduct', {
        name: productName,
        category: category,
        price: price,
        stock: stock,
    })
        .then(() => {
            alert('Produktas sukurtas!');
            fetchProducts();
        })
        .catch((error) => console.error('Klaida kuriant produktą:', error));
  };

  const deleteProduct = (id) => {
    Axios.delete(`http://localhost:3001/deleteProduct/${id}`)
        .then(() => {
            alert("Produktas sėkmingai ištrintas");
            setProducts(products.filter((product) => product._id !== id)); // Atnaujina lentelę
        })
        .catch((error) => console.error("Klaida trinant produktą:", error));
  };

  const updateProduct = (id) => {
    Axios.put(`http://localhost:3001/updateProduct/${id}`, {
        name: editingProduct.name,
        category: editingProduct.category,
        price: editingProduct.price,
        stock: editingProduct.stock,
    })
        .then((response) => {
            alert("Produktas atnaujintas!");
            fetchProducts(); // Atnaujina produktų sąrašą
            setEditingProduct(null); // Išvalo redagavimo būseną
        })
        .catch((error) => console.error("Klaida atnaujinant produktą:", error));
};


  return (
    <Container>
{/* Products Display Section */}
<h3 className="mt-5">Produktų sąrašas</h3>
<Table striped bordered hover>
    <thead>
        <tr>
            <th>Pavadinimas</th>
            <th>Kategorija</th>
            <th>Kaina</th>
            <th>Kiekis</th>
            <th>Veiksmai</th>
        </tr>
    </thead>
    <tbody>
        {products.map((product, index) => (
            <tr key={index}>
                <td>
                    {editingProduct && editingProduct._id === product._id ? (
                        <Form.Control
                            type="text"
                            value={editingProduct.name}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, name: e.target.value })
                            }
                        />
                    ) : (
                        product.name
                    )}
                </td>
                <td>
                    {editingProduct && editingProduct._id === product._id ? (
                        <Form.Control
                            type="text"
                            value={editingProduct.category}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, category: e.target.value })
                            }
                        />
                    ) : (
                        product.category
                    )}
                </td>
                <td>
                    {editingProduct && editingProduct._id === product._id ? (
                        <Form.Control
                            type="number"
                            value={editingProduct.price}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, price: e.target.value })
                            }
                        />
                    ) : (
                        product.price
                    )}
                </td>
                <td>
                    {editingProduct && editingProduct._id === product._id ? (
                        <Form.Control
                            type="number"
                            value={editingProduct.stock}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, stock: e.target.value })
                            }
                        />
                    ) : (
                        product.stock
                    )}
                </td>
                <td>
                    {editingProduct && editingProduct._id === product._id ? (
                        <>
                            <Button variant="success" onClick={() => updateProduct(product._id)}>
                                Save
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => setEditingProduct(null)}
                                className="ms-2"
                            >
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="warning"
                            onClick={() => setEditingProduct(product)}
                        >
                            Edit
                        </Button>
                    )}
                    <Button
                        variant="danger"
                        onClick={() => deleteProduct(product._id)}
                        className="ms-2"
                    >
                        Delete
                    </Button>
                </td>
            </tr>
        ))}
    </tbody>
</Table>


<h3 className="mt-4">Pridėti naują produktą</h3>
<Form>
    <Form.Group controlId="productName" className="mb-3">
        <Form.Control
            type="text"
            placeholder="Produkto pavadinimas..."
            onChange={(event) => setProductName(event.target.value)}
        />
    </Form.Group>

    <Form.Group controlId="category" className="mb-3">
        <Form.Control
            type="text"
            placeholder="Kategorija..."
            onChange={(event) => setCategory(event.target.value)}
        />
    </Form.Group>

    <Form.Group controlId="price" className="mb-3">
        <Form.Control
            type="number"
            placeholder="Kaina..."
            onChange={(event) => setPrice(event.target.value)}
        />
    </Form.Group>

    <Form.Group controlId="stock" className="mb-3">
        <Form.Control
            type="number"
            placeholder="Kiekis..."
            onChange={(event) => setStock(event.target.value)}
        />
    </Form.Group>

    <Button variant="primary" onClick={createProduct}>
        Pridėti produktą
    </Button>
</Form>
    </Container>
  )
}
export default Products; 