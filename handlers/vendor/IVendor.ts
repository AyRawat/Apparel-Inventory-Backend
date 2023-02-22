export interface Apparel{
  apparelId: string | null;
  quantity: number;
  price: number;
  size: SizeEnum| string | null;
  description?: string ;
  collection?: string ; 
}
export enum SizeEnum{
  S = 'S',
  M = 'M',
  L = 'L'
}

export interface UpdateStockResponseObject{
  message:string;
  value:Apparel;
}
export interface UpdateBulkStockResponseObject{
  message:string;
  failedTransactions?: ApparelStock
}

export type ApparelStock = Apparel[];