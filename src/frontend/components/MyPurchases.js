import { useState, useEffect,useContext } from 'react'

import './MyPurchases.css'
import { shortenAddress } from "../utils/shortenAddress";

import { TransactionContext } from "../context/TransactionContext";

export default function MyPurchases() {
  
const {loadPurchasedItems1,purchasesloading,purchases1}=useContext(TransactionContext);

 

  useEffect(() => {
    loadPurchasedItems1();
  }, []);

  if (purchasesloading)
    return (
      <main className="tit">
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <h2 style={{color: 'white'}}>Loading...</h2>
      </main>
    );
  return (
    <div className="flex justify-center fullHome">
      {purchases1.length > 0 ?
      <>
      <h2 className='myListedItemTitle'>Listed Warranties</h2>
        <div className='secondLine'>
            {purchases1.map((item, idx) => (
              <div className='NFTbox box-size'>
              <div key={idx} className="">
              <img src={item.image} className="NFTboxImg"alt={item.name}/>
                <div className="NFTboxContent">
                  <h1 className="NFTcardContentName1">{item.name}</h1>
                  <h1 className="NFTcardContent">Valid till : {item.tillData}</h1>
                  <h1 className="NFTcardContent">To : {shortenAddress(item.buyer)}</h1>
                  <h1 className="NFTcardContent">From : {shortenAddress(item.seller)}</h1>
                  <h1 className={item.status=="Expired"?"NFTcardStatusNotActive":"NFTcardStatusActive"}>Status : {item.status}</h1>
                </div>
              </div>
              </div>
              
            ))}
       
        </div>
        </>
        : (
          <div>
         <h1 className="tit">No Products purchased yet</h1>
       </div>
        )}
    </div>
  );
}