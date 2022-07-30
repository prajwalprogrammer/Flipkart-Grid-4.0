import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'
import './MyPurchases.css'

export default function MyPurchases({ marketplace, nft, account }) {
  const [loading, setLoading] = useState(true)
  const [purchases, setPurchases] = useState([])
  const [lastFive,setlastFive] = useState("")
  const loadPurchasedItems = async () => {
    // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
    const filter =  marketplace.filters.Bought(null,null,null,null,null,account)
    const results = await marketplace.queryFilter(filter)
    //Fetch metadata of each nft and add that to listedItem object.
    const purchases = await Promise.all(results.map(async i => {
      // fetch arguments from each result
      i = i.args
      // get uri url from nft contract
      const uri = await nft.tokenURI(i.tokenId)
      // use uri to fetch the nft metadata stored on ipfs 
      const response = await fetch(uri)
      const metadata = await response.json()
      // get total price of item (item price + fee)
      const totalPrice = await marketplace.getTotalPrice(i.itemId)
      // define listed item object
      setlastFive((metadata.description).slice((metadata.description).length - 10));
      console.log("vf",metadata)
      console.log("lastFive",lastFive)
      let purchasedItem = {
        totalPrice,
        price: i.price,
        itemId: i.itemId,
        name: metadata.name,
        description: metadata.description,
        image: metadata.image
      }
      return purchasedItem
    }))
    setLoading(false)
    setPurchases(purchases)
  }
  useEffect(() => {
    loadPurchasedItems()
  }, [])
  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Loading...</h2>
    </main>
  )
  return (
    <div className="flex justify-center fullHome">
      {purchases.length > 0 ?
        <div className='secondLine'>
            {purchases.map((item, idx) => (
              <div className='NFTbox box-size'>
              <div key={idx} className="">
              <img src={item.image} className="NFTboxImg"/>
                <div className="NFTboxContent">
                  <h1 className="NFTcardContentName">{ethers.utils.formatEther(item.totalPrice)} ETH</h1>
                  <h1 className="NFTcardContent">0.0001 ETH</h1>
                  <h1 className="NFTcardContent">VALID TILL : 2022-12-01</h1>
                  <h1 className="NFTcardContent">To : 0x3456788hdnyehji457</h1>
                  <h1 className="NFTcardStatusNotActive">Status : Expired</h1>
                  {/* <Card.Footer>VA : {lastFive}</Card.Footer> */}
                </div>
              </div>
              </div>
              
            ))}
       
        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No purchases</h2>
          </main>
        )}
    </div>
  );
}