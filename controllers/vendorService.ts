import {
  Apparel,
  ApparelStock,
  UpdateStockResponseObject,
  UpdateBulkStockResponseObject,
} from "../handlers/vendor/IVendor";
import fs from "fs";
import path from "path";
const dataFile = path.join(__dirname, "../", "/data.json");
const dataFilePath = "../data.json";

const getApparelStock = async (): Promise<ApparelStock> => {
  try {
    let data = await fs.promises.readFile(dataFile, "utf-8");
    return JSON.parse(data).inventory as ApparelStock;
  } catch (err) {
    console.log(err, "Failed to read the file");
    throw err;
  }
};

const saveApparelStock = (stock: ApparelStock) => {

  fs.writeFile(dataFile, JSON.stringify({ inventory: stock }), (err) => {
    if (err) {
      console.log(err, "Failed to write to the file");
    }
  });
};

export const updateStock = async (
  apparel: Apparel
): Promise<UpdateStockResponseObject> => {
  try {
   
    const { apparelId, quantity, size, price } = apparel;
    const stock: ApparelStock = await getApparelStock();
    const index = stock.findIndex((item: Apparel) => {
      return (
        item.apparelId?.toString() === apparelId?.toString() &&
        item.size?.toString() === size?.toString()
      );
    });
  
    if (index === -1) {
      throw `No such Apparel Found with this ${apparelId}`;
    }
    stock[index].quantity = +quantity;
    stock[index].price = +price;
    saveApparelStock(stock);
    let result: UpdateStockResponseObject = {
      message: "Successfully Updated the record",
      value: apparel,
    };
    return result;
  } catch (err) {
    console.log(err);
    throw { message: `Failed to Update :- ${err}`, value: apparel };
  }
};

export const updateBulkStock = async (
  apparels: ApparelStock
): Promise<UpdateBulkStockResponseObject> => {
  try {
    const stock: ApparelStock = await getApparelStock();
    const failedItems: ApparelStock = [];
    apparels.forEach((apparel: Apparel) => {
      const { apparelId, quantity, size, price } = apparel;
      const index = stock.findIndex(function (item: Apparel) {
        return (
          item.apparelId?.toString() === apparelId?.toString() &&
          item.size?.toString() === size?.toString()
        );
      });
      if (index != -1) {
        stock[index].quantity = +quantity;
        stock[index].price = +price;
      } else {
        failedItems.push(apparel);
      }
    });
    saveApparelStock(stock);
    let result = {
      message: failedItems.length
        ? "Not able to update the following items"
        : "All the Items were successfully Updated",
      failedTransactions: failedItems,
    };
    return result;
  } catch (err) {
    console.log(err, "Failed to update the stock");
    throw err;
  }
};
