import { Container, Form, Background } from './styles'
import { FiMail, FiLock } from 'react-icons/fi'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { useState } from 'react';


export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signIn } = useAuth();

    function handleSignIn() {
        signIn({ email, password })
    }

    return (
        <Container>
            <Form>
                <h1>Leumas Notes</h1>
                <p>App to save and manage your Links and Notes</p>

                <h2>Login</h2>
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

                <Button title="Login" onClick={handleSignIn} />

                <Link to="/register">
                    Create an Account
                </Link>

            </Form>

            <Background />

        </Container>
    );
}