import React, { useEffect, useState, useContext } from "react";
import './Chats.css';
import { UserContext } from "../../App";
import Message from "../Message/Message";

const Chats = ({ chats }) => {
    const { authService, chatService, appSelectedChannel, socketService } = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const [messageBody, setMessageBody] = useState('');
    const [typingMessage, setTypingMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // useEffect(() => {
    //     console.log('chat render');
    // }, [])

    useEffect(() => {
        setMessages(chats);
    }, [chats]);

    useEffect(() => {
        if(appSelectedChannel.id) {
            chatService.findAllMessagesForChannel(appSelectedChannel.id)
            .then((res) => setMessages(res));
            
        }
    }, [appSelectedChannel]);

    useEffect(() => {
        socketService.getUsersTyping((users) => {
            let names = '';
            let usersTyping = 0;
            for (const [typingUser, chId] of Object.entries(users)) {
                if(typingUser !== authService.name && appSelectedChannel.id === chId) {
                    names = (names === '' ? typingUser : `${names}, ${typingUser}`);
                    usersTyping += 1;
                }
            }
            if (usersTyping > 0) {
                const verb = (usersTyping > 1) ? 'are' : 'is';
                setTypingMessage(`${names} ${verb} typing...`);
            } else {
                setTypingMessage('');
            }
        })
    }, [appSelectedChannel]);

    const onTyping = ({ target: { value }}) => {
        if(!value.length) {
            setIsTyping(false);
            socketService.stopTyping(authService.name);
        } else if (!isTyping) {
            socketService.startTyping(authService.name, appSelectedChannel.id);
        } else {
            setIsTyping(true);
        }
        setMessageBody(value);
    }

    const sendMessage = (e) => {
        e.preventDefault();
        const { name, id, avatarName, avatarColor } = authService;
        const user = {
            userName: name,
            userId: id,
            userAvatar: avatarName,
            userAvatarColor: avatarColor,
        }
        socketService.addMessage(messageBody, appSelectedChannel.id, user);
        setMessageBody('');
        socketService.stopTyping(authService.name);
    }

    return (
        <div className="chat">
            <div className="chat-header">
                <h3>#{appSelectedChannel.name}-</h3>
                <h4>{appSelectedChannel.description}</h4>
            </div>
            <div className="chat-list">
                {!!messages.length ? messages.map((msg) => (
                    <Message 
                        key={msg.id}
                        msg={msg}
                    />
                )) : <div>No Messages</div>}
                

            </div>
            <form onSubmit={sendMessage} className="chat-bar">
                    {typingMessage.length > 0
                        ? <div className="typing">{typingMessage}</div>
                        : null 
                    }
                <div className="chat-bar-wrapper">
                    <textarea 
                        onChange={onTyping}
                        value={messageBody}
                        placeholder='type a message...'
                    />
                    <input 
                        type="submit" 
                        className="submit-btn"
                        value="send"
                    />
                </div>
            </form>
        </div>
    )
}

export default Chats;
