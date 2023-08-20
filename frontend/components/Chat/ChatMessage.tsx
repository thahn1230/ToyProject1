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
  setRestaurant: Dispatch<SetStateAction<RestaurantType | null>>;
}) => {
  const [restaurants, setRestaurants] = useState<JSX.Element[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<RestaurantType | null>(null);
  const onResturantClick = (restaurant: RestaurantType) => {
    if (selectedRestaurant?.name === restaurant.name) {
      setRestaurant(null);
      setSelectedRestaurant(null);
      return;
    }
    setRestaurant(restaurant);
    setSelectedRestaurant(restaurant);
  };

  useEffect(() => {
    const updatedRestaurants = message.restaurants.map(
      (restaurant: RestaurantType, index: number) => {
        return (
          <ChatMessageRestaurantWrapper
            key={index}
            onClick={onResturantClick.bind(null, restaurant)}
            selected={selectedRestaurant?.name === restaurant.name}
          >
            <ChatMessageRestaurantTextWrapper role="title">
              {restaurant.name}
            </ChatMessageRestaurantTextWrapper>
            <ChatMessageRestaurantTextWrapper>
              {restaurant.category}
            </ChatMessageRestaurantTextWrapper>
            <ChatMessageRestaurantTextWrapper>
              {restaurant.last_order}
            </ChatMessageRestaurantTextWrapper>
          </ChatMessageRestaurantWrapper>
        );
      }
    );
    setRestaurants(updatedRestaurants);
  }, [message, selectedRestaurant]);

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
          backgroundColor: message.isUser ? "white" : "#229954",
          color: message.isUser ? "black" : "white",
          borderRadius: message.isUser
            ? "20px 0px 20px 20px"
            : "0px 20px 20px 20px",
        }}
      >
        <div style={{ opacity: "1" }}>
          {message.message}
          {restaurants}
        </div>
      </ChatMessageTextWrapper>
    </ChatMessageWrapper>
  );
};
export default ChatMessage;
