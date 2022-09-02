import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import Modal from "../Modal/Modal";
import AvatarModal from "../AvatarModal/AvatarModal";
import './UserCreate.css';
// import { AVATARS_DARK, AVATARS_LIGHT } from "../../constants"; // ||* copied
import { UserContext } from "../../App";
import Alert from "../Alert/Alert";
import UserAvatar from "../UserAvatar/UserAvatar";
import { generateBgColor } from "../helpers/generateBgColor";


const UserCreate = () => {
    const { authService } = useContext(UserContext);
    const INIT_STATE = {
        userName: '',
        email: '',
        password: '',
        avatarName: 'avatarDefault.png',
        avatarColor: 'none',
    }
    const [userInfo, setUserInfo] = useState(INIT_STATE);
    const [avatarModal, setAvatarModal] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const onChange = ({ target: { name, value }}) => {
        setUserInfo({ ...userInfo, [name]: value });
    }

    const chooseAvatar = (avatar) => {
        setUserInfo({ ...userInfo, avatarName: avatar });
        setAvatarModal(false);
    }

    const updateColor = () => {
        const randomColor = generateBgColor();
        setUserInfo({ ...userInfo, avatarColor: `#${randomColor}` });
    }

    const createUser = (e) => {
        e.preventDefault();
        const { userName, email, password, avatarName, avatarColor } = userInfo;
        if (!!userName && !!email && !!password) {
            setIsLoading(true);
            const { from } = location.state || { from: {pathname: '/' }};
            authService.registerUser(email, password).then(() => {
                authService.loginUser(email, password).then(() => {
                    authService.createUser(userName, email, avatarName, avatarColor).then(() => {
                        setUserInfo(INIT_STATE);
                        navigate(from, { replace: true })
                    }).catch((error) => {
                        console.error('creating user',error);
                        setError(true);
                    })
                }).catch((error) => {
                    console.error('login user',error);
                    setError(true);
                })
            }).catch((error) => {
                console.error('register user',error);
                setError(true);
            })
            setIsLoading(false);
        }
    }

    const { userName, email, password, avatarName, avatarColor } = userInfo;
    const errorMsg = 'Error creating account. Please try again.'

    return (
        <>
        <div className="center-display">
            {error ? <Alert message={errorMsg} type="alert-danger" /> : null}
            {isLoading ? <div>Loading...</div> : null}
            <h3 className="title">Create an Account</h3>
            <form onSubmit={createUser} className="form">
                <input 
                    onChange={onChange}
                    value={userName}
                    className="form-control" 
                    type="text" 
                    name="userName"
                    placeholder="enter username" 
                />
                <input 
                    onChange={onChange}
                    value={email}
                    className="form-control" 
                    type="email" 
                    name="email" 
                    placeholder="enter email" 
                />
                <input 
                    onChange={onChange}
                    value={password}
                    className="form-control" 
                    type="password" 
                    name="password" 
                    placeholder="enter password" 
                />
                <div className="avatar-container">
                    <UserAvatar 
                        avatar={{ avatarName, avatarColor }}
                        className="create-avatar" 
                    />
                    <div onClick={() => setAvatarModal(true)} className="avatar-text">Choose Avatar</div>
                    <div onClick={updateColor} className="avatar-text">Generate background color</div>
                </div>
                <input className="submit-btn" type="submit" value="Create Account" />
            </form>
            <div className="footer-text">Already have an Account Login <Link to="/login">HERE</Link></div>
        </div>
        <AvatarModal 
            isOpen={avatarModal}
            close={() => setAvatarModal(false)}
            edit={false}
            chooseAvatar={chooseAvatar}
        />
        </>
    );
}



export default UserCreate;