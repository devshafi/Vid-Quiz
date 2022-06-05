import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
import classes from '../styles/Nav.module.css'
import Account from './Account'

export default function Nav() {
    return (
        <nav className={classes.nav}>
            <ul>
                <li>
                    <Link to="/" className={classes.brand}>
                        <img src={logo} alt="Learn with Sumit Logo" />
                        <h3>Vid Quiz</h3>
                    </Link>
                </li>
            </ul>
            <Account />
        </nav>

    )
}
