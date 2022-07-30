import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const TransactionContext = React.createContext();
// const navigate = useNavigate();
export const TransactionsProvider = ({ children }) => {
  const [IsAdmin, setIsAdmin] = useState(false);
  const [items, setItems] = useState([]);
  const [itemloading, setitemLoading] = useState(true);
  const [MyItemloading, setMyItemLoading] = useState(true);
  const [listedItems, setListedItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);

  
  const HandleLogout = () => {
    // alert("HI")
    sessionStorage.removeItem('Auth Token');
    setIsAdmin(false);
  };

  const loadMarketplaceItems = async (marketplace, nft) => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount();
    console.log("ITEM COUNT", itemCount);
    let items = [];
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i);
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId);
        // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        });
      }
    }
    setitemLoading(false);
    setItems(items);
  };

  const loadListedItems = async ( marketplace, nft, account ) => {
    // Load all sold items that the user listed
    const itemCount = await marketplace.itemCount();
    let listedItems = [];
    let soldItems = [];
    for (let indx = 1; indx <= itemCount; indx++) {
      const i = await marketplace.items(indx);
      if (i.seller.toLowerCase() === account) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(i.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(i.itemId);
        // define listed item object
        let item = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        };
        listedItems.push(item);
        // Add listed item to sold items array if sold
        if (i.sold) soldItems.push(item);
      }
    }
    setMyItemLoading(false);
    setListedItems(listedItems);
    setSoldItems(soldItems);
  };
  return (
    <TransactionContext.Provider
      value={{
        IsAdmin,
        setIsAdmin,
        HandleLogout,
        items,
        setItems,
        itemloading,
        setitemLoading,
        loadMarketplaceItems,
        loadListedItems,
        soldItems,
        setSoldItems,
        listedItems,
        setListedItems,
        MyItemloading,
        setMyItemLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
