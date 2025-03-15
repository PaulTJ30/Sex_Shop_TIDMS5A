import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TUSLogo from "./sexh.png";
import axios from "axios"


const App = () => {
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const onChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const onSubmit = async () => {
        //Peticion a la DB
        try {

            const res = await axios.post("http://localhost:4000/login", data)
            const user = (res.data.user)
            user.logined = true

            navigate("/Dashboard")

        } catch (error) {
            alert("Incorrecto")
        }

    }

    return (
        <Container className="login-container">
            <Card className="login-card">
                <Row className="g-0">
                    <Col md={6} className="login-form">
                        <Card.Body>
                            <div className="text-center">
                                <img
                                    src={TUSLogo}
                                    alt="Logo de Toys 4 Us"
                                    className="logo-img mb-3"
                                    style={{ width: "250px", height: "auto" }}
                                />
                            </div>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Correo electrónico:</Form.Label>
                                    <Form.Control
                                        placeholder="Ingresa tu correo electrónico"
                                        type="email"
                                        name="email"
                                        onChange={onChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Contraseña:</Form.Label>
                                    <Form.Control
                                        placeholder="Ingresa tu contraseña"
                                        type="password"
                                        name="password"
                                        onChange={onChange}
                                    />
                                </Form.Group>
                                <div className="text-center">
                                    <Button
                                        className="w-100 mb-2 custom-button"
                                        onClick={() => onSubmit()}
                                    >
                                        Ingresar
                                    </Button>
                                </div>
                                <p className="text-center mb-1">
                                    ¿No tienes cuenta?{" "}
                                    <Button
                                        variant="link"
                                        onClick={() => navigate("/Register")}
                                    >
                                        Regístrate
                                    </Button>
                                </p>
                                <p className="text-center">
                                    <Button
                                        variant="link"
                                        onClick={() =>
                                            navigate("/RecuperacionContraseña")
                                        }
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Button>
                                </p>
                            </Form>
                        </Card.Body>
                    </Col>
                    <Col md={6} className="login-image" />
                </Row>
            </Card>
        </Container >
    );
};

export default App;
