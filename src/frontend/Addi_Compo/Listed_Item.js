import React, { useContext, useEffect } from "react";
import { TransactionContext } from "../context/TransactionContext";
import Item from "./Item";
import { ethers } from "ethers";

export const ListedItem = ({ marketplace, nft, account }) => {
  const {
    loadListedItems,
    soldItems,
    setSoldItems,
    listedItems,
    setListedItems,
    MyItemloading,
    setMyItemLoading,
  } = useContext(TransactionContext);

  useEffect(() => {
    !MyItemloading && loadListedItems(marketplace, nft, account);
  }, []);

  if (MyItemloading) {
    return(
        <div>
        <h1 className="tit">Loading...</h1>
      </div>
    )
  }
  return (
    <div className="App">
      {listedItems.length > 0 ? (
        <>
          <div>
            <h1 className="tit">My Listed Item</h1>
          </div>
          <div className="firstLine">
            {listedItems.map((item, idx) => (
              <Item
                name={item.name}
                img={item.image}
                price={ethers.utils.formatEther(item.totalPrice)}
                productDesc={item.description}
                id={idx}
              />
            ))}
          </div>
        </>
      ) : (
        <div>
          <h1 className="tit">Not Listed Item</h1>
        </div>
      )}
    </div>
  );
};

export default ListedItem
