import { Dispatch, SetStateAction, useState } from "react";
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
      setMessages([...messages, { isUser: true, content: newMessage }]);
      setNewMessage("");
    }
  };

  const handleKeyDown = (event) => {
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
      ></input>
      <button onClick={handleSendMessage}>전송</button>
    </ChatInputWrapper>
  );
};

export default ChatInput;
