import fs from "fs";
import path from "path";
const dataFile = path.join(__dirname, "../", "/data.json");
import {
  IUserOrder,
  IUserOrders,
  ApparelDetails,
  FulfillResponseObject,
  LowestCostResponseObject
} from "../handlers/user/IUser";

async function getApparelDetails(apparelId:string|null, size:string): Promise<ApparelDetails | null>{
    try {
        const data = await fs.promises.readFile(dataFile, "utf-8");
        const result = JSON.parse(data).inventory.filter((item: any) => {
          return (
            item.apparelId?.toString() === apparelId?.toString() &&
            item.size?.toString() === size?.toString()
          );
        });
        if (result.length != 0) {
          const { apparelId, quantity, size, price } = result[0];
          let apparelDetail = {
            apparelId,
            quantity,
            size,
            price,
          };
          return apparelDetail;
        }
        return null;
      } catch (error) {
        console.error(error);
        return null;
      }
}

export const canFulfillOrder = async (orders: IUserOrders):Promise<FulfillResponseObject> => {
    try {

  let possible:boolean = true;
  for (const order of orders) {
    const apparel:ApparelDetails|null = await getApparelDetails(order.apparelId, order.size!);
    if(!apparel || apparel.quantity < order.quantity){
       possible= false;
       break;
    }
  }
  let result:FulfillResponseObject={canFulFill:possible}

  return result;
          
} catch (error) {
    console.log("Failed", error);
  throw error;       
}
};

export const minimumCost = async (orders:IUserOrders):Promise<LowestCostResponseObject>=>{
    try{
      let totalCost:number = 0;
      let validationMessage:string = '';
      for(const order of orders){
        const apparel: ApparelDetails|null = await getApparelDetails(order.apparelId , order.size!);
        if(apparel){console.log("Apparel Details" ,apparel," ",apparel.quantity ," ",order.quantity," ", (apparel.quantity < order.quantity))}
        if(!apparel || apparel.quantity < order.quantity ){
            console.log("I came inside for this", apparel)
            totalCost = -1;
            validationMessage = (!apparel)? `Apparel does not exist with this ID ${order.apparelId}`:"The Required Quantity is not available"; 
            break;
        }
        totalCost+=apparel.price*order.quantity;
      }
      
      let result:LowestCostResponseObject={lowestCost:-1,message:validationMessage}; 
      
    if(totalCost !== -1){
       result.message = "Successfully Calculated the Minimum Price";
       result.lowestCost = totalCost;
    }
    console.log("The Value of result",result);
    return result;
}catch(error){
    console.log("Failed to get the minimum Cost due to", error);
    throw error;
}
}
