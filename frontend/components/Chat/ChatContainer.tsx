import { Dispatch, SetStateAction } from "react";
import ChatBox from "./Chat";
import { ChatBody, ChatContainerWrapper } from "./Chat.styles";
import { RestaurantType } from "@/types/restaurant.type";

const ChatContainer = ({
  data,
  setData,
  setRestaurant,
}: {
  data: RestaurantType[];
  setData: Dispatch<SetStateAction<RestaurantType[]>>;
  setRestaurant: Dispatch<SetStateAction<RestaurantType | null>>;
}) => {
  return (
    <ChatContainerWrapper>
      <ChatBody>
        <ChatBox
          data={data}
          setData={setData}
          setRestaurant={setRestaurant}
        ></ChatBox>
      </ChatBody>
    </ChatContainerWrapper>
  );
};
export default ChatContainer;
