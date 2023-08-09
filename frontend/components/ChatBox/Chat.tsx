import { useEffect, useState } from "react";
import { Message } from "@/types/message.type";
import { ChatMessages } from "./Chat.styles";
import ChatInput from "./ChatInput";

const ChatBox = ({ setData }) => {
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    if (messages.length > 0) {
      PostMessage(messages[messages.length - 1].content);
    }
  }, [messages]);

  const PostMessage = (message: string) => {
    // handleSendMessage();
    fetch("http://localhost:8000/test/query", {
      method: "POST",
      headers: {
        Authorization: `Bearer`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((response) => {
        // console.log(response);
        setMessages([
          ...messages,
          { isUser: false, content: response.message },
        ]);
        // setData(JSON.parse());
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <ChatMessages>
        {" "}
        {messages.map((message, index) => {
          const left = message.isUser ? "40%" : "10%";
          return (
            <div
              key={index}
              className="message"
              style={{
                left: left,
                position: "relative",
                width: "40%",
                // height: "100%",
                border: "1px solid black",
                display: "flex",
                justifyContent: "end",
              }}
            >
              {message.content}
            </div>
          );
        })}
      </ChatMessages>
      <ChatInput messages={messages} setMessages={setMessages} />
    </>
  );
};
export default ChatBox;
