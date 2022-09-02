import React, { useContext, useState } from "react";
import "./UserUpdate.css";
import UserAvatar from "../components/UserAvatar/UserAvatar";
import AvatarModal from "../components/AvatarModal/AvatarModal";
import { UserContext } from "../App";
import { generateBgColor } from "../components/helpers/generateBgColor";

const UserUpdate = ({ ...props }) => {
    const { authService } = useContext(UserContext);
    const INIT_STATE_UPDATE = {
        id: authService.id,
        name: authService.name,
        email: authService.email,
        avatarName: authService.avatarName,
        avatarColor: authService.avatarColor,
    }

    const [updateUserInfo, setUpdateUserInfo] = useState(INIT_STATE_UPDATE);
    const [avatarModal, setAvatarModal] = useState(false);

    const updateAvatar = (avatar) => {
        setUpdateUserInfo({ ...updateUserInfo, avatarName: avatar });
        setAvatarModal(false);
    }

    const updateColor = () => {
        const randomColor = generateBgColor();
        setUpdateUserInfo({...updateUserInfo, avatarColor: `#${randomColor}` });
    }

    const handleUpdate = ({ target: { name, value }}) => {
        setUpdateUserInfo({...updateUserInfo, [name]: value});
    }

    const updateUser = (e) => {
        e.preventDefault();
        const { _id, userName, email, avatarName, avatarColor } = updateUserInfo;
        if (!!userName && !!email) {
            authService.updateUser(_id, userName, email, avatarName, avatarColor);
        }
        props.setEditMode(false);
        // setModal(false);
    }

    return (
        <div className="profile form-edit">
            <UserAvatar 
                avatar={{ 
                    avatarName: updateUserInfo.avatarName, 
                    avatarColor: updateUserInfo.avatarColor
                }} 
            />
            <div onClick={() => setAvatarModal(true)} className="avatar-text">Choose new Avatar</div>
            <AvatarModal 
                isOpen={avatarModal}
                close={() => setAvatarModal(false)}
                updateAvatar={updateAvatar}
                edit={true}
            />
            <div onClick={updateColor} className="avatar-text">Generate background color</div>
            <h5 className="edit-title">
                Edit <strong>username</strong> or <strong>email</strong>.
            </h5>
            <form onSubmit={updateUser}>
            <input 
                className="form-control" 
                type="text" 
                placeholder="new username" 
                name='userName'
                onChange={handleUpdate}
            />
            <input 
                className="form-control" 
                type="text" 
                placeholder="new email" 
                name='email'
                onChange={handleUpdate}
            />
            <input type="submit" value="Save" />
            {/* <button className="submit-btn">Save</button> */}
            </form>
        </div>
    )
}

export default UserUpdate;