import { RestaurantType } from "./restaurant.type";

export interface ReviewType {
  id: string;
  title: string;
  description: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  restaurant: RestaurantType;
}
