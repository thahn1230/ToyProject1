import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { ChatInputWrapper } from "./Chat.styles";
import { Message } from "@/types/message.type";

const ChatInput = ({
  messages,
  setMessages,
}: {
  messages: Array<Message>;
  setMessages: Dispatch<SetStateAction<Message[]>>;
}) => {
  const [newMessage, setNewMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([{ isUser: true, content: newMessage }, ...messages]);
      setNewMessage("");
    }
  };

  const handleKeyDown = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };
  return (
    <ChatInputWrapper>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyUp={handleKeyDown} // 엔터 키 이벤트 핸들링
        style={{
          width: "80%",
          height: "100%",
          border: "none",
          outline: "none",
        }}
      ></input>
      <button
        onClick={handleSendMessage}
        style={{ width: "15%", height: "80%" }}
      >
        전송
      </button>
    </ChatInputWrapper>
  );
};

export default ChatInput;
