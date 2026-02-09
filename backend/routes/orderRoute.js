import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazor,
  allOrders,
  userOrders,
  updateStatus,
  verifyStrip,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

//admin features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

//payment methode
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazor);

//user features
orderRouter.post("/userOrders", authUser, userOrders);

//verify payment 
orderRouter.post("/verifystrip", authUser, verifyStrip);


export default orderRouter;
