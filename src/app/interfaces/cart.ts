export interface Cart {
  data: CartData,
  status: string,
  numOfCartItems: number

}
export interface CartData {
  _id: string,
  cartOwner: string,
  createdAt: Date,
  products: CartProducts
}
export interface CartProducts {
  _id: string,
  quantity: number,
  count: number,
  product: CartProduct
}
export interface CartProduct {
  _id: string,
  image: string,
  name: string,
}
