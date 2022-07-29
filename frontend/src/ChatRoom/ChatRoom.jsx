import React from "react";

import "./ChatRoom.css";
import useChat from "../useChat";

const ChatRoom = (props) => {
  const { roomId } = props.match.params;
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState("");



  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };




  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };




  return (
    <div className="chat-room-container">
      <h1 className="room-name">Room-Id - {roomId}</h1>
      <div className="messages-container">
        <div className="statusDiv">
          <h3 className="status">This is the beginning of your conversation.</h3>
          <h3 className="status1">Chats are end to end encrypted</h3>
        </div>
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${message.ownedByCurrentUser ? "my-message" : "received-message"
                }`}
            >
              {message.body}
            </li>
          ))}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send Message
      </button>
    </div>
  );
};

export default ChatRoom;
