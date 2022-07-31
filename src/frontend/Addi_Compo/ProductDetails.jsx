import React,{useContext} from "react";
import { TransactionContext } from "../context/TransactionContext";
import { ToastContainer, toast } from "react-toastify";

export const ProductDetails = () => {
  const {phoneNum,setPhoneNum}=useContext(TransactionContext);
  const showMsg=()=>{
    toast.success("Phone Number Submitted Successfully");
  }
  return (
    <div className="success">
      <ToastContainer />
      <div class="successCard">
        <div className="circle">
          <i class="checkmark">✓</i>
        </div>
        <h1 className="successTit">Success</h1>
        <p className="successContent">
          We received your purchase request;
          <br /> we'll be in touch shortly!
        </p>
        <input
          type="text"
          placeholder="Enter your mobile number"
          className="phoneInput"
          onChange={(event) => {
            setPhoneNum(event.target.value);
          }}
        ></input>
        <button type="button" onClick={() =>showMsg()} className="phoneBtn">
          Submit
        </button>
        <p className="successContent">
          Please enter your mobile number <br />
          Once your warranty is created you will be notified
        </p>
      </div>
    </div>
  );
};
export default ProductDetails;
