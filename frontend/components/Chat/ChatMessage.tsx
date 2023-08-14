import { RestaurantType } from "@/types/restaurant.type";
import {
  ChatMessageRestaurantWrapper,
  ChatMessageTextWrapper,
  ChatMessageWrapper,
} from "./Chat.styles";
import { Message } from "@/types/message.type";

const ChatMessage = ({ message }: { message: Message }) => {
  const restaurants = !message.isUser
    ? message.restaurants.map((restaurant: RestaurantType) => {
        console.log(restaurant);
        return (
          <ChatMessageRestaurantWrapper>
            <ChatMessageTextWrapper>{restaurant.name}</ChatMessageTextWrapper>
            <ChatMessageTextWrapper>
              {restaurant.contact}
            </ChatMessageTextWrapper>
            {/* <ChatMessageTextWrapper>{restaurant.}</ChatMessageTextWrapper> */}
          </ChatMessageRestaurantWrapper>
        );
      })
    : null;
  //   console.log(message);
  return (
    <ChatMessageWrapper className="message">
      <ChatMessageTextWrapper
        style={{
          alignItems: message.isUser ? "flex-end" : "flex-start",
        }}
      >
        {message.message}
        {restaurants}
      </ChatMessageTextWrapper>
    </ChatMessageWrapper>
  );
};
export default ChatMessage;
