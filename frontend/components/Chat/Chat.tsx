import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Message } from "@/types/message.type";
import { ChatMessage, ChatMessages } from "./Chat.styles";
import ChatInput from "./ChatInput";
import { RestaurantType } from "@/types/restaurant.type";

const ChatBox = ({
  setData,
}: {
  setData: Dispatch<SetStateAction<RestaurantType[]>>;
}) => {
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    if (messages.length > 0 && messages[0].isUser) {
      PostMessage(messages[0].content);
    }
  }, [messages]);

  const PostMessage = (message: string) => {
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
        setMessages([{ isUser: false, content: response.answer }, ...messages]);
        setData([
          {
            name: "test",
            coordinate: { latitude: 0, longitude: 0 },
            content: null,
          },
        ]);
        // setData(JSON.parse());
      })
      .catch((error) => console.error("Error:", error));

    // setData([{ name: "test", coordinate: { latitude: 0, longitude: 0 } }]);
    // setMessages([{ isUser: false, content: "test" }, ...messages]);
  };

  return (
    <>
      <ChatMessages>
        {messages.map((message, index) => {
          return (
            <ChatMessage
              key={index}
              className="message"
              style={{
                justifyContent: message.isUser ? "flex-end" : "flex-start",
              }}
            >
              {message.content}
            </ChatMessage>
          );
        })}
      </ChatMessages>
      <ChatInput messages={messages} setMessages={setMessages} />
    </>
  );
};
export default ChatBox;
