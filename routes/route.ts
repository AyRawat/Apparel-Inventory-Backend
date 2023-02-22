import express = require("express");
import { Apparel, SizeEnum } from "../handlers/vendor/IVendor";
import { updateStock, updateBulkStock } from "../controllers/vendorService";
import { canFulfillOrder, minimumCost } from "../controllers/userService";
import {orderSchema , bulkOrderSchema} from "../validators/vendorSchema";
import {userOrderSchema} from "../validators/userSchema";
import { ValidationError } from 'yup';
export const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome ");
});

router.put("/stock", async (req, res) => {
  try {
    const { apparelId, size } = req.query;
    const apparel:Apparel = {
      apparelId: apparelId as string,
      size: size as string,
      quantity: req.body.quantity,
      price: req.body.price,
    };
  orderSchema.validateSync(apparel, { abortEarly: false, stripUnknown: true })
   const result = await updateStock(apparel);
   res.status(200).send(result);
  } catch (error) {
    const e = error as ValidationError;
    res.send({ message: "Operation Failed", error , e});
  }
});
router.put("/stock/apparel", async (req, res) => {
  try {
    const { data } = req.body;
    bulkOrderSchema.validateSync(data,{abortEarly:false, stripUnknown: true});
    const result = await updateBulkStock(data);
    res.status(200).send(result);
  } catch (error) {
    const e = error as ValidationError;
    res.send({ message: "Bulk Update Failed", e });
  }
});

router.post("/order/fulfill", async (req, res) => {
  try {
    const { order } = req.body;
    userOrderSchema.validateSync(order,{abortEarly:false,stripUnknown:true});
    const result = await canFulfillOrder(order);
    res.status(200).send(result);
  } catch (error) {
    const e = error as ValidationError;
    res.send({ message: "Failed to check :", e });
  }
});

router.post("/order/lowest-cost", async (req, res) => {
  try {
    const { order } = req.body;
    userOrderSchema.validateSync(order,{abortEarly:false,stripUnknown:true});
    let result = await minimumCost(order);
    if (result.lowestCost == -1) {
      res.status(200).send({ message: result.message });
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    const e = error as ValidationError;
    res.send(error);
  }
});

module.exports = { router };
