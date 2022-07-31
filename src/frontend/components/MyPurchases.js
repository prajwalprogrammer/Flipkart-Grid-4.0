import { useState, useEffect,useContext } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'
import './MyPurchases.css'
import { shortenAddress } from "../utils/shortenAddress";

import { TransactionContext } from "../context/TransactionContext";

export default function MyPurchases({ marketplace, nft, account }) {
  const [loading, setLoading] = useState(true)
  const [purchases, setPurchases] = useState([])
  const [lastFive, setlastFive] = useState("");
const {loadPurchasedItems1,purchasesloading,purchases1}=useContext(TransactionContext);

  var q = new Date();
  var m = q.getMonth() + 1;
  var d = q.getDay();
  var y = q.getFullYear();

  var date = new Date(y, m, d);
  const loadPurchasedItems = async () => {
    // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
    const filter = marketplace.filters.Bought(
      null,
      null,
      null,
      null,
      null,
      account
    );
    const results = await marketplace.queryFilter(filter);
    //Fetch metadata of each nft and add that to listedItem object.
    const purchases = await Promise.all(
      results.map(async (i) => {
        // fetch arguments from each result
        i = i.args;
        // get uri url from nft contract
        const uri = await nft.tokenURI(i.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(i.itemId);
        // define listed item object
        setlastFive(
          metadata.description.slice(metadata.description.length - 10)
        );
        var mydate = new Date(metadata.description.slice(metadata.description.length - 10));
        console.log("vf", metadata);
        console.log("lastFive", i);
        let purchasedItem = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
          seller: i.seller,
          buyer: i.buyer,
          status: date > mydate ? "Expired" : "Active",
        };
        return purchasedItem;
      })
    );
    setLoading(false);
    setPurchases(purchases);
  };
  useEffect(() => {
    loadPurchasedItems();
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
                  {/* <h1 className="NFTcardContentName">{ethers.utils.formatEther(item.totalPrice)} ETH</h1> */}
                  <h1 className="NFTcardContent">Valid till : {item.tillData}</h1>
                  <h1 className="NFTcardContent">To : {shortenAddress(item.buyer)}</h1>
                  <h1 className="NFTcardContent">From : {shortenAddress(item.seller)}</h1>
                  <h1 className={item.status=="Expired"?"NFTcardStatusNotActive":"NFTcardStatusActive"}>Status : {item.status}</h1>
                  {/* <Card.Footer>VA : {lastFive}</Card.Footer> */}
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