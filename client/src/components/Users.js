import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Container, Row, Col, Button, Form, Card,Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function Users() {
    const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState(""); 
  const [age, setAge] = useState(0); 
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [birthYear, setBirthYear] = useState(""); 

  const [editingUser, setEditingUser] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedAge, setUpdatedAge] = useState(0);
  const [updatedUsername, setUpdatedUsername] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedBirthYear, setUpdatedBirthYear] = useState("");

  const [errors, setErrors] = useState({});
  // Fetch users from the backend
  useEffect(() => { 
    Axios.get("http://localhost:3001/getUsers").then((response) => { 
      setListOfUsers(response.data); 
    }); 
  }, []);

  // User creation function
  const createUser = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Vardas privalomas";
    if (age <= 0 || isNaN(age)) newErrors.age = "Amžius turi būti sveikas skaicius";
    if (!username.trim()) newErrors.username = "Pavardė privaloma";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = "EL pastas privalomas";
    if (!birthYear) newErrors.birthYear = "Gimimo data privaloma";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
        // Stop execution if there are errors
        return;
    }

    Axios.post("http://localhost:3001/createUser", { name, age, username, email, birthYear })
        .then((response) => {
            alert("User created successfully");
            setListOfUsers([...listOfUsers, { name, age, username, email, birthYear, _id: response.data._id }]);
            setErrors({});
        })
        .catch((error) => {
            alert("Error creating user:", error);
        });
};


   // Delete user function
   const deleteUser = (id) => {
    Axios.delete(`http://localhost:3001/deleteUser/${id}`).then(() => {
      setListOfUsers(listOfUsers.filter((user) => user._id !== id)); // Remove the deleted user from state
      alert("User deleted successfully");
    });
  };

  // User update function
  const updateUser = (id) => {
    Axios.put(`http://localhost:3001/updateUser/${id}`, {
      name: updatedName,
      age: updatedAge,
      username: updatedUsername,
      email: updatedEmail,
      birthYear: updatedBirthYear,
    }).then((response) => {
      alert("Vartotojas atnaujintas");
      setEditingUser(null); // Užbaigiame redagavimą
      setListOfUsers(
        listOfUsers.map((user) =>
          user._id === id ? response.data : user // Atnaujiname sąraše
        )
      );
    });
  };

  return (
    <Container>
  <Row className="mb-4">
        {listOfUsers.map((user, index) => (
          <Col xs={12} sm={6} md={4} key={index} className="mb-4">
            <Card>
              <Card.Body>
                {editingUser === user._id ? (
                 
                  <>
                    <Form.Group controlId="formName" className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        defaultValue={user.name}
                        onChange={(event) => setUpdatedName(event.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="formAge" className="mb-3">
                      <Form.Control
                        type="number"
                        placeholder="Age"
                        defaultValue={user.age}
                        onChange={(event) => setUpdatedAge(event.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="formUsername" className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Username"
                        defaultValue={user.username}
                        onChange={(event) =>
                          setUpdatedUsername(event.target.value)
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="formEmail" className="mb-3">
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        defaultValue={user.email}
                        onChange={(event) =>
                          setUpdatedEmail(event.target.value)
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="formBirthYear" className="mb-3">
                      <Form.Control
                        type="date"
                        defaultValue={user.birthYear}
                        onChange={(event) =>
                          setUpdatedBirthYear(event.target.value)
                        }
                      />
                    </Form.Group>
                    <Button
                      variant="success"
                      onClick={() => updateUser(user._id)}
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      className="ms-2"
                      onClick={() => setEditingUser(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  
                  <>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Text>Age: {user.age}</Card.Text>
                    <Card.Text>Username: {user.username}</Card.Text>
                    <Card.Text>Email: {user.email}</Card.Text>
                    <Card.Text>Birth Year: {user.birthYear}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => setEditingUser(user._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="ms-2"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      
        <Row>
          <Col xs={12} sm={6} md={4} className="mx-auto">
            <h3 className="mb-4">Create New User</h3>
            <Form>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Control 
                  type="text" 
                  placeholder="Name ..." 
                  onChange={(event) => { setName(event.target.value); }}
                  isInvalid={!!errors.name} 
                />
                 <Form.Control.Feedback type="invalid">
                 {errors.name}
                 </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formAge" className="mb-3">
                <Form.Control 
                  type="number" 
                  placeholder="Age ..." 
                  onChange={(event) => { setAge(event.target.value); }}
                  isInvalid={!!errors.age} 
                />
                <Form.Control.Feedback type="invalid">
                 {errors.age}
                 </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Control 
                  type="text" 
                  placeholder="Username ..." 
                  onChange={(event) => { setUsername(event.target.value); }} 
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                 {errors.username}
                 </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control 
                  type="email" 
                  placeholder="Email ..." 
                  onChange={(event) => { setEmail(event.target.value); }} 
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                 {errors.email}
                 </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBirthYear" className="mb-3">
                <Form.Control 
                  type="date" 
                  onChange={(event) => { setBirthYear(event.target.value); }} 
                  isInvalid={!!errors.data}
                />
                <Form.Control.Feedback type="invalid">
                 {errors.data}
                 </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" onClick={createUser}>
                Create User
              </Button>
            </Form>
          </Col>
        </Row>
        
 {/* Accordion */}

          <Accordion defaultActiveKey="0">
          
            <Accordion.Item eventKey="0">
              <Accordion.Header>User Creation</Accordion.Header>
              <Accordion.Body>
                <h5>What is User Creation?</h5>
                <p>
                  User creation allows you to add new individuals to the platform. 
                  You need to provide basic details like Name, Age, Username, Email, and Birth Year. 
                  Once the information is filled, click the "Create User" button to add them to the list.
                </p>
              </Accordion.Body>
            </Accordion.Item>

          
            <Accordion.Item eventKey="1">
              <Accordion.Header>User Editing</Accordion.Header>
              <Accordion.Body>
                <h5>How to Edit User Information?</h5>
                <p>
                  Editing user information is a simple process. You can update details such as 
                  Name, Age, Username, Email, and Birth Year. To edit a user, just find the specific 
                  user in the list and click on the "Edit" button (this feature can be implemented later).
                </p>
              </Accordion.Body>
            </Accordion.Item>

        
            <Accordion.Item eventKey="2">
              <Accordion.Header>User Deletion</Accordion.Header>
              <Accordion.Body>
                <h5>How to Delete a User?</h5>
                <p>
                  Deleting a user removes them from the platform. It is essential to confirm before deletion 
                  to avoid accidental removals. The deletion process is irreversible. 
                  After confirming, click the "Delete" button next to the user's information.
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        
    </Container>
  )
}
export default Users;