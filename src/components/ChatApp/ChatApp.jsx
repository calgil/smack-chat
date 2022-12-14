import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../App";
import Modal from "../Modal/Modal";
import UserAvatar from "../UserAvatar/UserAvatar";
import './ChatApp.css';
import { useNavigate } from "react-router-dom";
import Channels from "../Channels/Channels";
import Chats from "../Chats/Chats";
import UserUpdate from "../../UserUpdate/UserUpdate";

const ChatApp = () => {

    const { authService, socketService, chatService, appSelectedChannel } = useContext(UserContext);
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [unreadChannels, setUnreadChannels] = useState([]);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        socketService.establishConnection();
        return () => socketService.closeConnection();
    }, []);

    useEffect(() => {
        socketService.getChatMessage((newMessage, messages) => {
            if(newMessage.channelId === chatService.selectedChannel.id) {
                setChatMessages(messages);
            }
            if (chatService.unreadChannels.length) {
                setUnreadChannels(chatService.unreadChannels);
            }
        })
    }, []);

    useEffect(() => {
        console.log('get channel messages');
        chatService.findAllMessagesForChannel(appSelectedChannel.id)
        .then((res) => setChatMessages(res))
        .catch((err) => console.error(err));

    }, [editMode])


    const logoutUser = () => {
        authService.logoutUser();
        setModal(false);
        navigate('/login');
    }

    return (
        <div className="chat-app">
            <nav>
                <h1>Smack Chat</h1>
                <div className="user-avatar" onClick={() => setModal(true)}>
                    <UserAvatar 
                        size="sm"
                        className="nav-avatar"
                    />
                    <div>{authService.name}</div>
                </div>
            </nav>
            <div className="smack-app">
                <Channels
                    unread={unreadChannels}
                />
                <Chats 
                    chats={chatMessages} 
                />
            </div>
            <Modal 
                title="Profile"
                isOpen={modal}
                close={() => setModal(false)}
            >
                <button 
                    className="edit-btn"
                    onClick={() => setEditMode(!editMode)}
                >
                    Edit
                </button>
                    { editMode
                        ?   <UserUpdate 
                                setEditMode={setEditMode}
                                setModal={setModal}
                            />
                        : <div className="profile">
                            <UserAvatar />
                            <h4>Username: {authService.name}</h4>
                            <h4>Email: {authService.email}</h4>
                        </div>
                    }
                    {!editMode &&
                        <button onClick={logoutUser} className="submit-btn logout-btn">Logout</button>
                    }
            </Modal>
        </div>
    );
}

export default ChatApp;