import {
  Address,
  Category,
  Contact,
  Image,
  Order,
  OrderItem,
  Product,
  User,
} from "@prisma/client";

export type ProductWithCategoryAndImages = Product & {
  images: Image[];
  category: Category;
};

export type UserWithAddresseAndMessage = User & {
  messages: Contact[];
  adress: Address[];
  orders: OrderWithOrderItems[];
};

export type OrderWithOrderItems = Order & {
  orderItems: OrderItemWithProduct[];
};

export type OrderItemWithProduct = OrderItem & {
  product: Product;
};
