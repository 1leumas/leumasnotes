import { useState } from "react";
import { Container, Form, Background } from './styles'
import { FiMail, FiLock, FiUser } from 'react-icons/fi'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Link, useNavigate } from 'react-router-dom';
import { api } from "../../services/api"

export function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleSignUp() {
        if (!name || !email || !password) {
            return (
                alert("please fill all the fields")
            );
        }

        api.post("/users", { name, email, password })
            .then(() => {
                alert("user registered");
                navigate("/");
            })
            .catch(error => {
                if (error.response) {
                    alert(error.response.data);
                } else {
                    alert("wasnt possible to register")
                }
            })
    }

    return (

        <Container>
            <Background />

            <Form>
                <h1>Leumas Notes</h1>
                <p>App to save and manage your Links and Notes</p>

                <h2>Create an Account</h2>

                <Input
                    placeholder="Name"
                    type="text"
                    icon={FiUser}
                    onChange={e => setName(e.target.value)}
                />

                <Input
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    onChange={e => setEmail(e.target.value)}
                />

                <Input
                    placeholder="Password"
                    type="Password"
                    icon={FiLock}
                    onChange={e => setPassword(e.target.value)}
                />

                <Button title="Sign Up" onClick={handleSignUp} />

                <Link to="/">
                    Back to Login
                </Link>

            </Form>
        </Container>
    );
}