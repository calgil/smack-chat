import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import Alert from "../Alert/Alert";


const UserLogin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { authService } = useContext(UserContext);
    const [userLogins, setUserLogins] = useState({ email: '', password: '' });
    const [error, setError] = useState(false);

    const onChange = ({ target: { name, value }}) => {
        setUserLogins({ ...userLogins, [name]: value });
    }

    const onLoginUser = (e) => {
        e.preventDefault();
        // const location = useLocation();
        // console.log('location', location);
        const { email, password } = userLogins;
        if (!!email && !!password) {
            const { from } = location.state || { from: { pathname: '/' }};
            authService.loginUser(email, password)
                .then(() => navigate(from, { replace: true }))
                .catch(() => {
                    setError(true);
                    setUserLogins({ email: '', password: '' });
                })
        }
    }
    const errorMsg = 'Sorry, you entered an incorrect email or password'

    return (
        <div className="center-display">
            {error ? <Alert message={errorMsg} type=" alert-danger" /> : null}
            <form onSubmit={onLoginUser} className="form">
                <label htmlFor="credentials"> Enter your <strong>email address</strong> and <strong>password</strong></label>
                <input 
                    onChange={onChange} 
                    value={userLogins.email}
                    id="credentials" 
                    type="email" 
                    autoComplete="off"
                    className="form-control" 
                    name="email" 
                    placeholder="email@email.com"
                />
                <input 
                    onChange={onChange} 
                    value={userLogins.password}
                    id="credentials1" 
                    type="password" 
                    autoComplete="off"
                    className="form-control" 
                    name="password" 
                    placeholder="password"
                />
                <input 
                    id="credentials2" 
                    type="submit" 
                    className="submit-btn" 
                />
            </form>
            <div className="footer-text">
                No Account? Create one
                <Link to="/register"> HERE </Link>
            </div>
        </div>
    );
}

export default UserLogin;