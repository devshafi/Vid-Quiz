import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from "../components/Form";
import classes from '../styles/Login.module.css';
import { useAuth } from './../contexts/AuthContext';
import Button from "./Button";
import TextInput from "./TextInput";

export default function LoginForm() {

    let navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("") // remove previous error
            setLoading(true);
            await login(email, password);
            navigate("/", { replace: true });
        } catch (error) {
            console.log('login error', error);
            setError("Failed to login");
        }
        finally {
            setLoading(false);
        }

    }

    return (
        <Form className={`${classes.login} `} onSubmit={handleSubmit}>
            <TextInput
                type="email"
                placeholder="Enter email"
                icon="alternate_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <TextInput
                type="password"
                placeholder="Enter password"
                icon="lock"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button disables={loading} type="submit">
                <span>Submit now</span>
            </Button>
            {error && <p className="error">{error}</p>}
            <div className="info">Don't have an account? <Link to="/signup">Signup</Link> instead.</div>
        </Form>
    )
}
