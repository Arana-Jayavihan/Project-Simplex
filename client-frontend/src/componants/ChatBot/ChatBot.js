import React from "react";
import ChatBot from "react-simple-chatbot";

function Chat_Bot() {
  return (
    <ChatBot
      style={{
        display: "fixed",
        position: "fixed",
        marginTop: 50,
        marginLeft: 1090,
      }}
      headerTitle="Simplex"
      recognitionEnable={true}
      const
      steps={[
        {
          id: "Greet",
          message: "Hello, Welcome to SIMPLEX! Please enter your name",
          trigger: "Done",
        },

        {
          id: "Done",
          user: true,
          trigger: "Name",
        },

        {
          id: "Name",
          message:
            "Great! {previousValue}, How can I help you?, Please select your needs",
          trigger: "needs",
        },

        {
          id: "needs",
          options: [
            {
              value: "Contact Agent",
              label: "Contact Agent",
              trigger: "Contact Agent",
            },

            {
              value: "See new Collections",
              label: "See new Collections",
              trigger: "See new Collections",
            },
          ],
        },

        {
          id: "Contact Agent",
          message:
            "Great! Contact number: +94 773175000, Email: simplextextile@gmai.com. You can contact the agent through this.",
          trigger: "thanks",
        },

        {
          id: "See new Collections",
          message: "ASAP",
          trigger: "thanks",
        },

        {
          id: "thanks",
          user: true,
          trigger: "msg",
        },

        {
          id: "msg",
          message: "You are welcome, ",
          end: true,
        },
      ]}
    />
  );
}

export default Chat_Bot;
