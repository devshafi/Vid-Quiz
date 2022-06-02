import classes from '../../styles/Signup.module.css';
import Button from '../Button';
import Checkbox from '../Checkbox';
import Form from '../Form';
import TextInput from '../TextInput';
import Illustration from './../Illustration';


export default function Signup() {
    return (
        <>
            <h1>Create an account</h1>
            <div className="column">
                <Illustration />
                <Form className={`${classes.signup} form`} >
                    <TextInput
                        type="text"
                        placeholder="Enter name"
                        icon="person"
                    />
                    <TextInput
                        type="email"
                        placeholder="Enter email"
                        icon="alternate_email"
                    />
                    <TextInput
                        type="password"
                        placeholder="Enter password"
                        icon="lock"
                    />
                    <TextInput
                        type="password"
                        placeholder="Confirm password"
                        icon="lock_clock"
                    />
                    <Checkbox
                        text="I agree to the Terms &amp; Conditions"
                    />
                    <Button> <span> Submit Now</span> </Button>
                    <div className="info">Already have an account? <a href="login.html">Login</a> instead.</div>

                </Form>
            </div>
        </>
    )
}
