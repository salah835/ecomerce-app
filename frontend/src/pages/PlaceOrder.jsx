import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [methode, setMethode] = useState("cod");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems= []
      for (const items in cartItems){
        for(const item in cartItems[items])
          if(cartItems[items][item] > 0){
            const iteminfo = structuredClone(products.find(product => product._id === items))
            if(iteminfo){
              iteminfo.size = item
              iteminfo.quantity = cartItems[items][item]
              orderItems.push(iteminfo)
            }
          }
      }
      let orderData = {
        address : formData,
        items : orderItems,
        amount : getCartAmount() + delivery_fee
      }
      switch(methode){
        // api calls for cod
        case 'cod':
          const response = await axios.post(backendUrl +  "/api/order/place",orderData,{headers : {token}})
          if(response.data.success){
            setCartItems({})
            navigate("/orders")
          }else{
            toast.error(response.data.message)
          }
        break;
        case 'strip' : 
        const responsestrip = await axios.post(backendUrl +  "/api/order/stripe",orderData,{headers : {token}})
        if(responsestrip.data.success){
          const {session_url} = responsestrip.data
          window.location.replace(session_url)
        }else{
          toast.error(responsestrip.data.message)
        }
        break;
        default:

        break;
      }
      
    } catch (error) {
      console.log(error);
      toast.error(response.error.message)
      
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14min-h-[80vh] border-t "
    >
      {/**  ----------left side ---------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px] ">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstname"
            value={formData.firstname}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full  "
            type="text"
            placeholder="First name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastname"
            value={formData.lastname}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full  "
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full  "
          type="email"
          placeholder="Email Addres"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full  "
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full  "
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full  "
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full  "
            type="number"
            placeholder="Zip CODE"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full  "
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full  "
          type="number"
          placeholder="Phone"
        />
      </div>
      {/** ---------- right side ---------- */}
      <div className="mt-8 ">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHODE"} />
        </div>
        {/** --------- payment methode ---------- */}
        <div className="flex gap-3 flex-col lg:flex-row">
          <div
            onClick={() => setMethode("strip")}
            className="flex items-center gap-3 border p-2 px-3 cursor-pointer "
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${methode === "strip" ? "bg-green-400" : ""} `}
            ></p>
            <img src={assets.stripe_logo} className="h-5 mx-4" alt="" />
          </div>
          <div
            onClick={() => setMethode("razorpay")}
            className="flex items-center gap-3 border p-2 px-3 cursor-pointer "
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${methode === "razorpay" ? "bg-green-400" : ""} `}
            ></p>
            <img src={assets.razorpay_logo} className="h-5 mx-4" alt="" />
          </div>
          <div
            onClick={() => setMethode("cod")}
            className="flex items-center gap-3 border p-2 px-3 cursor-pointer "
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${methode === "cod" ? "bg-green-400" : ""} `}
            ></p>
            <p className="text-gray-500 text-sm font-medium mx-4  ">
              CACH ON DELIVERY
            </p>
          </div>
        </div>
        <div className="w-full text-end mt-8">
          <button
            type="submit"
            className="bg-black text-white px-16 py-3 text-sm "
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
