import {inventory} from "../data.json";
import {IApparel} from "../handlers/vendor/IVendor";

export const updateProduct = async (apparel:IApparel): Promise<void> =>{
    let index = inventory.findIndex((d:IApparel)=>d.apparelId === apparel['apparelId']);
    if(index >= 0){
      inventory[index]['price'] = apparel['price'] ;
      inventory[index]['quantity']  = apparel['quantity'];
      inventory[index]['description'] = apparel['description'] as string;
      inventory[index]['collection'] = apparel['collection'] as string;
      inventory[index]['size'] = apparel['size'];
    }
}