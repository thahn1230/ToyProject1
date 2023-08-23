import { Dispatch, SetStateAction } from "react";
import ChatBox from "./Chat";
import { ChatBody, ChatContainerWrapper, ChatHeader } from "./Chat.styles";
import { RestaurantType } from "@/types/restaurant.type";

const ChatContainer = ({
  setData,
}: {
  setData: Dispatch<SetStateAction<RestaurantType[]>>;
}) => {
  return (
    <ChatContainerWrapper>
      <ChatHeader>ChatHeader</ChatHeader>
      <ChatBody>
        <ChatBox setData={setData}></ChatBox>
      </ChatBody>
    </ChatContainerWrapper>
  );
};
export default ChatContainer;
