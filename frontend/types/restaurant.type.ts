export interface RestaurantType {
  name: string;
  coordinate: { latitude: number; longitude: number };
  content: any;
  phone: string;
  category: string;
  lastOrder: number;
}
