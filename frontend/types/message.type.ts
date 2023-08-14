import { RestaurantType } from "./restaurant.type";

export interface Message {
  isUser: boolean;
  message: string;
  restaurants: Array<RestaurantType>;
}
