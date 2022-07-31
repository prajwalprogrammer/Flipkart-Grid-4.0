import { useState, useEffect,useContext } from 'react'

import { shortenAddress } from "../utils/shortenAddress";
import { TransactionContext } from "../context/TransactionContext";



export default function Claimed() {
 
  const { loadListedItems1,listedloading,soldItems1,} = useContext(TransactionContext);

  
  useEffect(() => {
    loadListedItems1();
  }, [])
  if (listedloading) return (
    <main className="tit">
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <h2 style={{color: 'white'}}>Loading...</h2>
      </main>
  )
  return (
    <div className="MyListedItem">
        {soldItems1.length > 0 ?
        <>
        <h2 className='myListedItemTitle'>Claimed Warranties</h2>
        <div className='secondLine'>
            {soldItems1.map((item, idx) => (
              <div className='NFTbox box-size'>
              <div key={idx} className="">
              <img src={item.image} className="NFTboxImg"alt={item.name}/>
                <div className="NFTboxContent">
                  <h1 className="NFTcardContentName1">{item.name}</h1>
                  <h1 className="NFTcardContent">Valid till : {item.tillData}</h1>
                  <h1 className="NFTcardContent">To : {shortenAddress(item.buyer)}</h1>
                 
                  <h1 className={item.status==="Expired"?"NFTcardStatusNotActive":"NFTcardStatusActive"}>Status : {item.status}</h1>
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