import React, { useState } from "react";
import './AvatarModal.css';
import { AVATARS_DARK, AVATARS_LIGHT } from "../../constants";

const AvatarModal = ({ ...props }) => {
    const {  isOpen, close, edit, chooseAvatar, updateAvatar } = props;
    const [avatarTheme, setAvatarTheme] = useState(true);
    const [avatarArray, setAvatarArray] = useState(AVATARS_DARK);

    const changeTheme = ({ target: { value }}) => {
        if (value === 'dark') {
            setAvatarTheme(true);
            setAvatarArray(AVATARS_DARK);
        } else {
            setAvatarTheme(false);
            setAvatarArray(AVATARS_LIGHT);
        }
    }

    const selectAvatar = (avatar) => {
        edit
        ? updateAvatar(avatar)
        : chooseAvatar(avatar);
        // this component used in both create and edit. need to use setUserInfo from UserCreate and setEditInfo from edit
        // setUserInfo({ ...userInfo, avatarName: avatar });
        // setModal(false);
    }


    return (
        <>
        { isOpen ? (
            <div className="modal">
            <div className="modal-dialog">
                <div 
                    className={`modal-body ${avatarTheme ? 'dark' : 'light'}`} 
                >
                    <div className="modal-header">
                        <h5>Choose Avatar</h5>
                        <button onClick={close}>&times;</button>
                    </div>
                    <div className="theme-container">
                        <button
                            className={avatarTheme ? 'active' : 'inactive'}
                            onClick={changeTheme}
                            value='dark'
                        >
                            Dark
                        </button>
                        <button
                            className={!avatarTheme ? 'active' : 'inactive'}
                            onClick={changeTheme}
                            value='light'
                        >
                            Light
                        </button>
                    </div>
                    <div className="avatar-list">
                    {
                        avatarArray.map((img) => (
                            <div 
                                role="presentation" 
                                key={img} 
                                className={`create-avatar ${avatarTheme ? 'dark' : 'light'}`} 
                                onClick={() => selectAvatar(img)}
                            >
                                <img src={img} alt="avatar" />
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>
        ) : null }
        </>
    )
}

export default AvatarModal;