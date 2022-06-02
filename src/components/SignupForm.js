import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from '../styles/Signup.module.css';
import { useAuth } from './../contexts/AuthContext';
import Button from './Button';
import Checkbox from './Checkbox';
import Form from './Form';
import TextInput from './TextInput';

export default function SignupForm() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agree, setAgree] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    const { signup } = useAuth();


    async function handleSubmit(e) {
        e.preventDefault();

        //password validation
        if (password !== confirmPassword) {
            return setError("Password mismatched");
        }
        try {
            setError("") // remove previous error
            setLoading(true);
            await signup(email, password, username);
            navigate("/", { replace: true });
        } catch (error) {
            console.log('signup error', error);
            setError("Failed to create user");
        }
        finally {
            setLoading(false);
        }

    }

    return (
        <Form className={`${classes.signup} form`} onSubmit={handleSubmit}>
            <TextInput
                type="text"
                placeholder="Enter name"
                icon="person"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
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
            <TextInput
                type="password"
                placeholder="Confirm password"
                icon="lock_clock"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            <Checkbox
                text="I agree to the Terms &amp; Conditions"
                value={agree}
                onChange={(e) => setAgree(e.target.value)}
                required
            />
            <Button disabled={loading} type="submit"> <span> Submit Now</span> </Button>

            {error && <p className="error">{error}</p>}

            <div className="info">Already have an account? <Link to="/login">Login</Link> instead.</div>

        </Form>
    )
}
