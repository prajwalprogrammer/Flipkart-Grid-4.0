import { useState, useEffect, useContext } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import "./Home.css";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
const Home = ({ marketplace, nft, account }) => {

  const { loadmarketplaceItems1, MyItemloading, items1 } =
    useContext(TransactionContext);

 
  const buyMarketItem = async (item) => {
    await (
      await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();
    loadmarketplaceItems1();
  };

  useEffect(() => {
    loadmarketplaceItems1();
  }, []);
  if (MyItemloading)
    return (
      <main className="tit">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h2 style={{ color: "white" }}>Loading...</h2>
      </main>
    );


  return (
    <div className="flex justify-center fullHome">
      {items1.length > 0 ? (
        <>
        <h2 className='myListedItemTitle'>New Issued Warranties</h2>
        <div className="secondLine">
          {items1.map((item, idx) => (
            <div className="NFTbox box-size" key={idx}>
              <div>
                <img className="NFTboxImg" src={item.image} alt="img"></img>
              </div>
              <div className="NFTboxContent">
                <h4 className="NFTcardContentName">{item.name}</h4>
                <h5 className="NFTcardContent">From : {shortenAddress(item.seller)}</h5>
                <h5 className="NFTcardContent">Description : {item.description}</h5>
              </div>
              <Button
                onClick={() => buyMarketItem(item)}
                className="NFTbuyBtn NFTbtn-grad"
              >
                Claim your Warranty
              </Button>
            </div>
          ))}
        </div>
        </>
      ) : (
        <div>
          <h1 className="tit">No New Warranties Issued</h1>
        </div>
      )}
    </div>
  );
};
export default Home;
