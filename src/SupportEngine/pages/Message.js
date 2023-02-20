import React from 'react';
import './chat.css';

const Message = ({ message, isMine }) => {
    const messageClass = isMine ? 'mine' : 'not-mine';
    const style = { width: `${message.length * 10}px` };
    return (
        <div className={`message ${messageClass}`} style={style}>
            <p>{message}</p>
        </div>
    );
};

export default Message;
