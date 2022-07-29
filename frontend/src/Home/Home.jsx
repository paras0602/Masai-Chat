import React from "react";
import { Link } from "react-router-dom";

import "./Home.css";

const Home = () => {
  const [roomName, setRoomName] = React.useState("");

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  return (
    <div className="home-container">
      <h1 className="heading">Live Chat Application -<span> Made with Socket.io</span></h1>
      <input
        type="text"
        placeholder="Enter Room No"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
      <Link to={`/${roomName}`} className="enter-room-button">
        Create/Join room
      </Link>
    </div>
  );
};

export default Home;
