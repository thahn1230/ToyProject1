import { RestaurantType } from "@/types/restaurant.type";
import {
  ChatMessageRestaurantTextWrapper,
  ChatMessageRestaurantWrapper,
  ChatMessageTextWrapper,
  ChatMessageWrapper,
} from "./Chat.styles";
import { Message } from "@/types/message.type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const ChatMessage = ({
  message,
  setRestaurant,
}: {
  message: Message;
  setRestaurant: Dispatch<SetStateAction<RestaurantType>>;
}) => {
  const [restaurants, setRestaurants] = useState<JSX.Element[]>([]);
  const onResturantClick = (restaurant: RestaurantType) => {
    setRestaurant(restaurant);
  };
  useEffect(() => {
    const updatedRestaurants = message.restaurants.map(
      (restaurant: RestaurantType, index: number) => {
        return (
          // <div
          //   key={index}
          //   style={{
          //     border: "1px solid black",
          //     borderRadius: "10px",
          //     padding: "5px 5px",
          //     width: "90%",
          //     backgroundColor: "white",
          //     // backgroundColor: "#74DF00",ㄴ
          //     margin: "10px",
          //   }}
          //   >
          // </div>
          <ChatMessageRestaurantWrapper
            key={index}
            onClick={setRestaurant(restaurant)}
          >
            <ChatMessageRestaurantTextWrapper>
              {restaurant.name}
            </ChatMessageRestaurantTextWrapper>
            <ChatMessageRestaurantTextWrapper>
              {restaurant.contact}
            </ChatMessageRestaurantTextWrapper>
          </ChatMessageRestaurantWrapper>
        );
      }
    );
    setRestaurants(updatedRestaurants);
  }, [message]);

  //   console.log(message);
  return (
    <ChatMessageWrapper
      style={{
        alignItems: message.isUser ? "flex-end" : "flex-start",
      }}
    >
      {/* <div
        style={{
          width: "35px",
          height: "35px",
          border: "1px solid black",
          borderRadius: "50%",
          margin: "2px",
          backgroundColor: message.isUser ? "#e6e5eb" : "#58ACFA",
        }}
      ></div> */}
      <ChatMessageTextWrapper
        style={{
          alignItems: message.isUser ? "flex-end" : "flex-start",
          backgroundColor: message.isUser ? "#e6e5eb" : "#F7D358",
          //   color: message.isUser ? "black" : "white",
          borderRadius: message.isUser
            ? "20px 0px 20px 20px"
            : "0px 20px 20px 20px",
        }}
      >
        {message.message}
        {restaurants}
      </ChatMessageTextWrapper>
    </ChatMessageWrapper>
  );
};
export default ChatMessage;
