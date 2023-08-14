import { Dispatch, SetStateAction, useState } from "react";
import { ChatInputWrapper } from "./Chat.styles";
import { Message } from "@/types/message.type";
import Input from "@mui/joy/Input";

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
      setMessages([
        { isUser: true, message: newMessage, restaurants: [] },
        ...messages,
      ]);
      setNewMessage("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };
  return (
    <ChatInputWrapper>
      <Input
        color="neutral"
        variant="outlined"
        size="sm"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyUp={handleKeyDown} // 엔터 키 이벤트 핸들링
        style={{ width: "100%", height: "100%" }}
      />
    </ChatInputWrapper>
  );
};

export default ChatInput;
