interface size{
  's' : number,
  'm' : number,
  'l' : number
}


export interface IApparel{
  apparelId: number | null;
  quantity: number;
  price: number;
  size: size;
  description?: string ;
  collection?: string ; 
}