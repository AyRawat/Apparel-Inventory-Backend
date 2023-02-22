export interface IUserOrder{
    apparelId: string | null;
    quantity: number;
    size: string | null;
}
export interface ApparelDetails{
  apparelId: string | null;
  quantity: number;
  price: number;
  size: string | null;
}
export interface FulfillResponseObject{
    canFulFill: boolean;
}
export interface LowestCostResponseObject{
    message:string
    lowestCost: number
}
export interface ApparelReqObject{
    apparelId: string|null;
    size: number
}
export type IUserOrders = IUserOrder[];