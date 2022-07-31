import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const TransactionContext = React.createContext();
// const navigate = useNavigate();
export const TransactionsProvider = ({ children }) => {
  
  const [IsAdmin, setIsAdmin] = useState(false);
  const [itemloading, setitemLoading] = useState(true);

// Purchase
const [purchasesloading, setpurchasesLoading] = useState(true);
  const [purchases1, setPurchases1] = useState([]);

  //Listed items
  const [listedItems1, setListedItems1] = useState([]);
  const [soldItems1, setSoldItems1] = useState([]);
  const [listedloading, setListedloading] = useState(true)
  const [lastFive, setlastFive] = useState("");
  
  //Home
  const [items1, setItems1] = useState([]);
  const [MyItemloading, setMyItemLoading] = useState(true);
  const [account1, setAccount1] = useState(null);
  const [nft1, setNFT1] = useState({});
  const [marketplace1, setMarketplace1] = useState({});
  
  //Phone number
  const [phoneNum,setPhoneNum] = useState("");

  var q = new Date();
  var m = q.getMonth() + 1;
  var d = q.getDay();
  var y = q.getFullYear();

  var date = new Date();
  
  const HandleLogout = () => {
    // alert("HI")
    sessionStorage.removeItem('Auth Token');
    setIsAdmin(false);
  };

  const loadmarketplaceItems1 = async () => {
    console.log('loading');
    // Load all unsold items
    const itemCount = await marketplace1.itemCount()
    // console.log(itemCount);
    let items = []
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace1.items(i)
      console.log("1",item);
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft1.tokenURI(item.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace1.getTotalPrice(item.itemId)
        // Add item to items array
        console.log("metadata ",metadata)
        console.log("firstfirst"+item)
        if(account1.toLowerCase()===item.UserAddress.toLowerCase()){

          items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          buyer: item.UserAddress,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        })
        }
      }
    }
    setMyItemLoading(false)
    setItems1(items)
    console.log("first"+ JSON.stringify(items))
  }

  const loadListedItems1 = async () => {
    // Load all sold items that the user listed
    const itemCount = await marketplace1.itemCount()
    let listedItems = []
    let soldItems = []
    for (let indx = 1; indx <= itemCount; indx++) {
      const i = await marketplace1.items(indx)
      if (i.seller.toLowerCase() === account1) {
        // get uri url from nft contract
        const uri = await nft1.tokenURI(i.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace1.getTotalPrice(i.itemId)
        // define listed item object
        setlastFive(
          metadata.description.slice(metadata.description.length - 17)
        );
        var mydate = new Date(metadata.description.slice(metadata.description.length - 17));
        let item = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
          buyer:i.UserAddress,
          tillData:metadata.description.slice(metadata.description.length - 17),
          status: date.getTime() > mydate.getTime() ? "Expired" : "Active",
        }

        console.log("item11111",item)

        listedItems.push(item)
        // Add listed item to sold items array if sold
        if (i.sold) soldItems.push(item)
      }
    }
    setListedloading(false)
    setListedItems1(listedItems)
    setSoldItems1(soldItems)
  }

  const loadPurchasedItems1 = async () => {
    // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
    const filter = marketplace1.filters.Bought(
      null,
      null,
      null,
      null,
      null,
      account1
    );
    const results = await marketplace1.queryFilter(filter);
    //Fetch metadata of each nft and add that to listedItem object.
    const purchases = await Promise.all(
      results.map(async (i) => {
        // fetch arguments from each result
        i = i.args;
        // get uri url from nft contract
        const uri = await nft1.tokenURI(i.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplace1.getTotalPrice(i.itemId);
        // define listed item object
        setlastFive(
          metadata.description.slice(metadata.description.length - 17)
        );
        var mydate = new Date(metadata.description.slice(metadata.description.length - 17),);
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
          tillData:metadata.description.slice(metadata.description.length - 17),
          status: date.getTime() > mydate.getTime() ? "Expired" : "Active",
        };
        return purchasedItem;
      })
    );
    setpurchasesLoading(false);
    setPurchases1(purchases);
  };
  
  return (
    <TransactionContext.Provider
      value={{
        IsAdmin,
        setIsAdmin,
        HandleLogout,
        items1,
        setItems1,
        itemloading,
        setitemLoading,
        soldItems1,
        setSoldItems1,
        listedItems1,
        setListedItems1,
        listedloading, 
        setListedloading,
        MyItemloading,
        setMyItemLoading,
        loadListedItems1,
        marketplace1, setMarketplace1,nft1, setNFT1,account1, setAccount1,
        loadmarketplaceItems1,
        loadPurchasedItems1,purchasesloading,purchases1,setPurchases1,
        phoneNum,setPhoneNum
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
