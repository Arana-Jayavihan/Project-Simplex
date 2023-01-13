// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { userChats } from "../../api/ChatRequests";
import "./Chat.css";

export default function Chat() {
  //   const { user } = useSelector((state) => state.chatauthReducer.authData);
  //   console.log(user);
  //   const [chats, setChats] = useState([]);

  //   useEffect(() => {
  //     const getChats = async () => {
  //       try {
  //         const { data } = await userChats(user._id);
  //         setChats(data);
  //         console.log(data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     getChats();
  //   }, [user]);

  return (
    <div className="Chat">
      {/*Left side */}
      <div className="Left-side-chat">
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">Conversation</div>
        </div>
      </div>

      {/*Right side */}
      <div className="Right-side-chat">Right Side</div>
    </div>
  );
}
