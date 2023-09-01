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
  address: Address[];
  orders: OrderWithOrderItems[];
};

export type UserWithAddresse = User & {
  address: Address[];
};

export type OrderWithOrderItems = Order & {
  orderItems: OrderItemWithProduct[];
};

export type OrderItemWithProduct = OrderItem & {
  product: Product;
};
