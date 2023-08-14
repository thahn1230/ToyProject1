export interface RestaurantType {
  name: string;
  category: string;
  coordinate: { latitude: number; longitude: number };
  location: string;
  last_order: string;
  contact: string;
}
