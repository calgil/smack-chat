import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import UserAvatar from "../UserAvatar/UserAvatar";
import "./Message.css";
import { formatDate } from "../helpers/dateFormat";

const Message = ({ msg }) => {
    const { authService, chatService } = useContext(UserContext);
    const [isEdit, setIsEdit] = useState(false);
    const [newMessage, setNewMessage] = useState('');

const handleChange = ({ target: {value }}) => {
    setNewMessage(value);
}

const editMessage = (e) => {
    e.preventDefault();
    const { id, channelId, userName, userAvatar, userAvatarColor } = msg;
    if (!!newMessage.length) {
        chatService.updateChatMessage(id, newMessage, authService.id, channelId, userName, userAvatar, userAvatarColor)
    }
    setIsEdit(false);
    // this is updating message data. now to trigger re-render
}

    return (
        <div className="chat-message">
                        <UserAvatar 
                            avatar={{ 
                                avatarName: msg.userAvatar, 
                                avatarColor: msg.userAvatarColor
                            }} 
                            size="md" 
                        />
                        <div className="chat-user">
                            <strong>{msg.userName}</strong>
                            <small>{formatDate(msg.timeStamp)}</small>
                            <div className="message-container">
                                { (isEdit && msg.userName === authService.name)
                                    ? <form onSubmit={editMessage}>
                                        <input 
                                            type="text" 
                                            placeholder={msg.messageBody} 
                                            onChange={handleChange}
                                        />
                                    </form>
                                    : <div className="message-body">{msg.messageBody}</div>
                                }
                                {/* <div className="message-body">{msg.messageBody}</div> */}
                                {msg.userId === authService.id 
                                ? <div className="update-message">
                                    <span onClick={() => setIsEdit(true)} className="edit">🖊️</span>
                                    <span className="delete">🗑️</span>
                                    </div> 
                                : null }
                            </div>
                        </div>
                    </div>
    )
};


export default Message;