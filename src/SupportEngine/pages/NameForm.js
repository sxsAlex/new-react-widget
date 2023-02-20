import React, { useState, useEffect, useRef  } from 'react';
import './chat.css';
import Message from './Message';

const EmailForm = () => {
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const [result, setResult] = useState();
    
    async function onSubmit(event) {
        event.preventDefault();
        try {
            const message = event.target.elements.message.value;
            setMessages((messages) => [
                ...messages,
                { text: message, sender: "user" },
            ]);

            const response = await fetch("/src/SupportEngine/pages/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: message }),
                
            });
            console.log(JSON.stringify({ prompt: message }))

            const data = await response.json();
            if (response.status !== 200) {
                throw data.error || new Error(`Request failed with status ${response.status}`);
            }
            
           

            // Simulating a response from a bot after 1 second
            setTimeout(() => {
                setMessages((messages) => [
                    ...messages,
                    { text: result, sender: "bot" },
                ]);
            }, 1000);
            setResult(data.result);
            setMessages("");
        } catch (error) {
            // Consider implementing your own error handling logic here
            console.error(error);
            alert(error.message);
        }
    }

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }

    }, [messages]);

    return (
        <div className="chat-container">
            <div className="chat-name">
                Chat Support
            </div>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`chat-message ${message.sender === "user" ? "user" : "bot"}`}
                    >
                        {message.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={onSubmit} className="chat-input">
                <input type="text" name="message" placeholder="Type a message..." />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};



export default EmailForm;
