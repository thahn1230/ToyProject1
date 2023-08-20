import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ChatInputButton, ChatInputContainer } from "./Chat.styles";
import { Message } from "@/types/message.type";
import Input from "@mui/joy/Input";

import { FaArrowUp, FaStop } from "react-icons/fa";

const ChatInput = ({
  messages,
  setMessages,
}: {
  messages: Array<Message>;
  setMessages: Dispatch<SetStateAction<Message[]>>;
}) => {
  const [newMessage, setNewMessage] = useState<string>("");
  const [isLoding, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (messages.length > 0 && messages[0].isUser) {
      setIsLoading(true);
    } else if (messages.length > 0 && !messages[0].isUser) {
      setIsLoading(false);
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && !isLoding) {
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
    <ChatInputContainer>
      <Input
        sx={{
          "--Input-focusedThickness": 0,
        }}
        placeholder="메세지를 입력하세요"
        style={{
          width: "80%",
          height: "50px",
          border: "none",
        }}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyUp={handleKeyDown} // 엔터 키 이벤트 핸들링
      ></Input>
      <ChatInputButton onClick={handleSendMessage}>
        {!isLoding ? (
          <FaArrowUp
            style={{
              width: "15px",
              height: "15px",
              color: "white",
              // borderRadius: "50%",
              // border: "1px solid white",
            }}
          />
        ) : (
          <FaStop
            style={{
              width: "10px",
              height: "10px",
              color: "white",
              // borderRadius: "50%",
            }}
          />
        )}
      </ChatInputButton>
      {/* <InputLoadingContainer>
        <div></div>
        <div></div>
        <div></div>
      </InputLoadingContainer> */}
    </ChatInputContainer>
  );
};

export default ChatInput;
