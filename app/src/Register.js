import React, { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import axios from "axios"

export const RegisterUser = () => {
    const [data, setData] = useState({});

    const navigate = useNavigate();

    const onChangeRegister = (e) => {
        e.preventDefault();
        const nData = data;
        nData[e.target.name] = e.target.value;
        setData(nData);
        console.log(nData)
    };
    const onSubmit = async () => {
        /* Enviar data al server */
        try {
            data.rol = "client"
            await axios.post("http://localhost:4000/register", data)
            navigate("/")
            alert("Registrado con exito")
        } catch (error) {
            alert("hubo un error")
        }
    }


    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>¡Registrate aqui!</Card.Title>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control onChange={onChangeRegister} name="name" placeholder="Ingresa tu nombre" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Apellidos:</Form.Label>
                            <Form.Control onChange={onChangeRegister} name="lastNames" placeholder="Ingresa tu apellido" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Correo:</Form.Label>
                            <Form.Control onChange={onChangeRegister} name="email" type="email" placeholder="Ingresa tu correo" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control onChange={onChangeRegister} name="password" type="password" placeholder="Ingresa tu contraseña" />
                        </Form.Group>
                        <Button onClick={() => onSubmit()}>¡Registrate!</Button>
                        <p>¿Ya tienes cuenta? </p>
                        <Button onClick={() => navigate("/")}>Inicia sesion aqui</Button>
                    </Form>

                </Card.Body>
            </Card >
        </Container >
    )
}

