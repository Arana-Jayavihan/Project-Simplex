import React from "react";
import Fab from "@mui/material/Fab";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
// import Chat_Bot from "../ChatBot/ChatBot";

function Button() {
  return (
    <div>
      <Fab
        style={{
          display: "fixed",
          position: "fixed",
          marginTop: '35%',
          marginLeft: '95%',
          backgroundColor: "blue",
          color: "white",
        }}
      >
        <EmailRoundedIcon />
      </Fab>
    </div>
  );
}

export default Button;
