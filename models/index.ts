export type PERMISSIONS =
  | 'ADMIN'
  | 'USER'
  | 'ITEMCREATE'
  | 'ITEMUPDATE'
  | 'ITEMDELETE'
  | 'PERMISSIONUPDATE';

export interface Item {
  __typename: string;
  description: string;
  id: string;
  image: string;
  largeImage?: string;
  price: number;
  title: string;
}

export interface CartItem {
  id: string;
  item: Item;
  quantity: number;
}

export interface User {
  __typename: string;
  email: string;
  id: string;
  name: string;
  permissions: PERMISSIONS[];
}
