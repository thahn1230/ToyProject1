import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Message } from "@/types/message.type";
import { ChatMessageWrapper, ChatMessages } from "./Chat.styles";
import ChatInput from "./ChatInput";
import { RestaurantType } from "@/types/restaurant.type";
import ChatMessage from "./ChatMessage";

const ChatBox = ({
  data,
  setData,
  setRestaurant,
}: {
  data: RestaurantType[];
  setData: Dispatch<SetStateAction<RestaurantType[]>>;
  setRestaurant: Dispatch<SetStateAction<RestaurantType>>;
}) => {
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    if (messages.length > 0 && messages[0].isUser) {
      PostMessage(messages[0].message);
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
        console.log(JSON.parse(response.answer).restaurants);
        setMessages([
          {
            isUser: false,
            message: JSON.parse(response.answer).message,
            restaurants: JSON.parse(response.answer).restaurants,
          },
          ...messages,
        ]);

        setData(JSON.parse(response.answer).restaurants);
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
          return <ChatMessage key={index} message={message}></ChatMessage>;
        })}
      </ChatMessages>
      <ChatInput messages={messages} setMessages={setMessages} />
    </>
  );
};
export default ChatBox;
